import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import noteImage from "../images/Notes-pana.svg";

function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col sm:flex-row w-auto md:w-[750px] lg:w-[900px] h-full sm:h-[450px] box-border shadow-md rounded-lg items-center">
      <div className="w-full sm:flex-[2.5] relative sm:block">
        <img
          src={noteImage}
          alt="note img"
          className="w-full h-full hidden sm:block object-cover"
        />
      </div>
      <div className="flex-[2] flex flex-col items-center justify-center p-4">
        <h1 className="text-6xl sm:text-3xl mb-8 sm:mb-2 font-bold text-center">
          Welcome to <span className="text-[#03e9f4]">Task Manager</span>
        </h1>
        <p className="max-w-md text-center text-xl sm:text-lg">
          Here, you can create and organize your thoughts efficiently. Creating
          a note is as simple as clicking on `New Note` and starting to write.
          If you`re new here, we invite you to sign up to start creating your
          own notes. If you already have an account, simply log in to access
          your existing notes.
        </p>
        <div className="flex justify-center space-x-8 sm:space-x-2 mt-12 sm:mt-6 text-2xl">
          <button className="flex items-center justify-center px-16 py-4 sm:px-4 sm:py-2 w-24 text-3xl sm:text-lg bg-[#03e9f4] text-white rounded-[10px] hover:translate-y-[5px] ">
            <Link to={"/register"}>Register</Link>
          </button>
          <button className="flex items-center justify-center px-16 py-4 sm:px-4 sm:py-2 w-24 text-3xl sm:text-lg bg-[#03e9f4] text-white rounded-[10px] hover:translate-y-[3px]">
            <Link to={"/login"}>Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
