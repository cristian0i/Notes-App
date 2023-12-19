import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  const AuthenticatedLinks = () => (
    <>
      <li className=" sm:border-slate-50 sm:hover:border-cyan-400 sm:border py-1 px-3 border-solid rounded-lg hover:text-[#03e9f4]">
        <Link to={"/tasks/add"}>Create Task</Link>
      </li>
      <li className="sm:border-slate-50 sm:hover:border-cyan-400 sm:border py-1 px-3 border-solid rounded-lg hover:text-[#03e9f4]">
        <Link to={"/"} onClick={logout}>
          Logout
        </Link>
      </li>
    </>
  );

  const UnauthenticatedLinks = () => (
    <>
      <li className="sm:border-slate-50 sm:hover:border-cyan-400 sm:border py-1 px-3 border-solid rounded-lg hover:text-[#03e9f4]">
        <Link to={"/register"}>Register</Link>
      </li>
      <li className="sm:border-slate-50 sm:hover:border-cyan-400 sm:border py-1 px-3 border-solid rounded-lg hover:text-[#03e9f4]"> 
        <Link to={"/login"}>Login</Link>
      </li>
    </>
  );

  const menurRef = useRef(null);
  const toggleMenu = () => {
    menurRef.current.classList.toggle("show_menu");
  };

  return (
    <div className="my-3 flex flex-row text-center justify-between py-5 px-10 items-center">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <h1 className="text-3xl md:text-4xl font-bold">Tasks <span className="text-[#03e9f4]">Manager</span></h1>
      </Link>
      <div className="navigation" ref={menurRef} onClick={toggleMenu}>
        <ul className="menu flex items-center justify-center gap-14 sm:gap-3 md:text-lg text-xl">
          {isAuthenticated ? <AuthenticatedLinks /> : <UnauthenticatedLinks />}
        </ul>
      </div>
      <span className="sm:hidden" onClick={toggleMenu}>
        <span className="material-symbols-outlined">menu</span>
      </span>
    </div>
  );
}

export default Navbar;
