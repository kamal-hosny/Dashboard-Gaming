import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("data", data);
    };

    return (
        <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className=" w-96 flex flex-col gap-3 shadow-md bg-white border border-[f0f0f0] p-7"
        >
            <div className="formHeader flex flex-col gap-1">
                <p className="font-bold text-3xl">Welcome back</p>
                <p className="text-[#717376] text-sm">Welcome back! Please enter your details.</p>
            </div>
            <div className="formBody flex flex-col gap-2 ">
                <div className="inputs flex flex-col gap-2">
                    <div className="email w-full">
                        <label htmlFor="email" className=" block font-semibold text-sm">
                            Email
                        </label>
                        <input
                            className="border w-full border-[#303030] rounded-md p-2"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            type="text"
                            id="email"
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm pt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="password w-full relative">
                        <label htmlFor="password" className="block font-semibold text-sm">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="border w-full border-[#303030] rounded-md p-2"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters",
                                    },
                                })}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                            />
                            <div
                                className="icon-login absolute top-1/2 cursor-pointer -translate-y-1/2 right-[5%]"
                                onClick={() => {
                                    setShowPassword(!showPassword);
                                }}
                            >
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </div>
                        </div>
                        {errors.password && (
                            <p className="text-red-600 text-sm pt-1">{errors.password.message}</p>
                        )}
                    </div>
                </div>
                <div className="btn">
                    <Link to="/products">
                    <button
                        type="submit"
                        className="bg-[#0f1626] text-white w-full p-2 rounded-md"
                    >
                        Login
                    </button>
                    </Link>
                    
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
