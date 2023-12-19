import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth must be used an AuthPorivder");
  }
  return context;
};

export const AuthPorvider = ({ children }) => {
  const [user, SetUser] = useState(null);
  const [isAuthenticated, SetIsAuthenticated] = useState(false);
  const [errors, SetErrors] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);

  const signup = async (user) => {
    try {
      const response = await registerRequest(user);
      SetUser(response.data);
      SetIsAuthenticated(true);
    } catch (error) {
      SetErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const response = await loginRequest(user);
      SetUser(response.data);
      SetIsAuthenticated(true);
    } catch (error) {
      SetErrors(error.response.data);
    }
  };  

  const logout = async () => {
  Cookies.remove("token");
  SetIsAuthenticated(false);
  SetUser(null);
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        SetErrors([]);
      }, 6500);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        SetIsAuthenticated(false);
        SetIsLoading(false);
        return SetUser(null);
      } else {
        try {
          const response = await verifyTokenRequest(cookies.token);
          if (!response.data) {
            SetIsAuthenticated(false);
            SetUser(null);
            return
          }
          SetUser(response.data);
          SetIsAuthenticated(true);
        } catch (error) {
          SetUser(null);
          SetIsAuthenticated(false);
        }
        SetIsLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, logout, user, isAuthenticated, errors, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
