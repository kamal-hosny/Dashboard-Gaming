import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <div className="w-80">
        <img className="" src="/assets/error.png" alt="" />
      </div>
      <p>Sorry, an unexpected error has occurred.</p>
      <div>
        <i className="text-red-600">{error.statusText || error.message}</i>
      </div>

      <button
        onClick={() => navigate("/", { replace: true })}
        class=" px-6 py-2  overflow-hidden group bg-gradient-to-r from-gray-700 to-black relative hover:bg-gradient-to-r hover:from-gray-600 hover:to-black text-white transition-all ease-out duration-300"
      >
        <span class="absolute right-0 w-10 h-full top-0 transition-all duration-1000  transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
        <span class="relative text-xl font-semibold">BACK TO HOME</span>
      </button>
    </div>
  );
};

export default ErrorPage;
