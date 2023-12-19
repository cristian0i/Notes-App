import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-[-60px]" >
      <div className="w-[400px] p-10 bg-[rgba(0,0,0,.5)] shadow-2xl rounded-xl ">
        <h1 className="mb-8 text-center text-3xl font-semibold text-[#03e9f4]">Login</h1>
        {loginErrors.map((error, index) => (
            <p
              key={index}
              className="text-white text-center p-2 mb-8 bg-[#03e9f4] text-sm rounded-md font-medium"
            >
              {error}
            </p>
          ))}
        <form onSubmit={onSubmit} className="mt-5 flex flex-col items-center">
          <div className="relative mb-8 w-full">
            <input type="text" {...register("email", { required: true })} list="autocompleteOff" name="email" required=" " autoFocus  className="w-full py-3 px-0text-[16px] border-solid border-b border-white outline-none bg-transparent" />
            <label className="absolute top-0 left-0 py-3 px-0 text-[16px] pointer-events-none duration-700">Email</label>
            {errors.email && (
                  <p className="text-[10px] mt-2 text-red-500">
                    Emial is required
                  </p>
                )}
          </div>
          <div className="relative mb-8 w-full">
            <input type="password" {...register("password", { required: true })} name="password" required=" " className="w-full py-3 px-0 text-[16px] border-solid border-b border-white outline-none bg-transparent" />
            <label className="absolute top-0 left-0 py-3 px-0 text-[16px] pointer-events-none duration-700">Password</label>
            {errors.password && (
                  <p className="text-[10px] mt-2 text-red-500">
                    Password is required
                  </p>
                )}
            
          </div>
          <button type="submit" className="light relative inline-block py-3 px-5 text-[#03e9f4] decoration-[none] overflow-hidden mt-6 tracking-[4px] duration-700">
            <span className="absolute block"></span>
            <span className="absolute block"></span>
            <span className="absolute block"></span>
            <span className="absolute block"></span>
            LOGIN
          </button>
        </form>
      </div>

        <span className="mt-2 text-sm text-center">
        Don´t have an account?{" "}
        <Link
          to="/register"
          className="text-[#03e9f4] hover:text-neutral-400 duration-300"
          href="/register"
        >
          Register
        </Link>{" "}
      </span>
    </div>
  );
}

export default LoginPage;

