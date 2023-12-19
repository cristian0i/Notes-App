import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-[-40px]" >
      <div className="w-[400px] p-10 bg-[rgba(0,0,0,.5)] shadow-2xl rounded-xl ">
        <h1 className="mb-8 text-center text-3xl font-semibold text-[#03e9f4]">Register</h1>
        {registerErrors.map((error, index) => (
            <p
              key={index}
              className="text-white text-center p-2 mb-8 bg-[#03e9f4] text-sm rounded-md font-medium"
            >
              {error}
            </p>
          ))}
        <form onSubmit={onSubmit} className="mt-5 flex flex-col items-center">
        <div className="relative mb-8 w-full">
            <input type="text" {...register("username", { required: true })} list="autocompleteOff" name="username" required=" " autoFocus className="w-full py-3 px-0text-[16px] border-solid border-b border-white outline-none bg-transparent" />
            <label className="absolute top-0 left-0 py-3 px-0 text-[16px] pointer-events-none duration-700">Username</label>
            {errors.username && (
                  <p className="text-[10px] mt-2 text-red-500">
                    Username is required
                  </p>
                )}
          </div>
          <div className="relative mb-8 w-full">
            <input type="text" {...register("email", { required: true })} list="autocompleteOff" name="email" required=" " className="w-full py-3 px-0text-[16px] border-solid border-b border-white outline-none bg-transparent" />
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
            Register
          </button>
        </form>
      </div>

        <span className="mt-2 text-sm text-center">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[#03e9f4] hover:text-neutral-400 duration-300"
          href="/login"
        >
          Login
        </Link>{" "}
      </span>
    </div>
  );
}

export default RegisterPage;

