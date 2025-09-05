"use client";
import React, { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  SignInFailure,
  SignInStart,
  SignInSuccess,
} from "@/lib/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import { z } from "zod";
import api from "@/utils/axios";
import { signIn } from "next-auth/react";
// ✅ Zod Schema
const SignInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SignIn = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
    setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    // ✅ Zod validation
    const result = SignInSchema.safeParse(formData);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFormErrors({
        email: errors.email?.[0] || "",
        password: errors.password?.[0] || "",
      });
      return;
    }

    try {
      dispatch(SignInStart());

      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          username: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const data = response.data;
      const userRole = data.sub?.role || data.role;
      console.log("Validation data ", userRole);

      if (data.success === false) {
        dispatch(SignInFailure(data.message));

        if (data.message?.toLowerCase().includes("invalid")) {
          setFormErrors({
            email: "",
            password: "Invalid email or password",
          });
        } else {
          setGeneralError(data.message || "An unexpected error occurred.");
        }
        return;
      }
      Cookies.set("userRole", userRole, {
        expires: 1 / 24,
        secure: true,
        sameSite: "Strict",
      });
      // Successful login
      Cookies.set("accessToken", data.accessToken, {
        expires: 1 / 24, // 1 hour
        secure: true,
        sameSite: "Strict",
        path: "/",
      });
      // Cookies.set("refreshToken", data.refreshToken, { expires: 1 / 24 });

      dispatch(SignInSuccess(data));

      if (data.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/userdashboard");
      }
    } catch (error) {
      dispatch(SignInFailure(error.message));

      if (error.response && error.response.status === 401) {
        setFormErrors({
          email: "",
          password: "Invalid email or password",
        });
      } else {
        setGeneralError("There was a server error. Please try again.");
      }
    }
  };
  const handleGoogleLogin = () => {
    signIn("google", {
      callbackUrl: "/userdashboard", // or /dashboard if admin check is done in backend
    });
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#fff5f5] px-4">
      <div className="bg-white  shadow-2xl max-w-md w-full p-6 relative mb-5">
        {/* Top bar with tomato background */}
        <div className="absolute top-0 left-0 w-full  bg-tomato py-1">
          <h2 className="text-white text-3xl font-extrabold text-center tracking-wide">
            Sign In
          </h2>
        </div>

        {/* Spacer for top bar */}
        <div className="pt-8 text-center mb-2">
          <span className="text-[#9F9F9F] text-lg block">
            Please enter your details
          </span>
        </div>

        {/* OR Divider */}
        <div className="flex items-center justify-center mb-3">
          <hr className="border-tomato border w-full max-w-[90px]" />
          <span className="mx-2 text-tomato font-semibold bg-white px-3 rounded-full border border-tomato select-none">
            --
          </span>
          <hr className="border-tomato border w-full max-w-[90px]" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-2">
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-tomato text-lg placeholder:text-gray-400 transition ${
                formErrors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#E8E8F2]"
              }`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-2 relative">
            <input
              type={showPass ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-tomato text-lg placeholder:text-gray-400 transition ${
                formErrors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#E8E8F2]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute opacity-60 right-4 top-1/2 -translate-y-1/2 hover:opacity-100 transition"
              aria-label="Toggle password visibility"
            >
              {showPass || formData.password === "" ? (
                <FiEyeOff className="text-2xl text-tomato" />
              ) : (
                <FiEye className="text-2xl text-tomato" />
              )}
            </button>
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
            {generalError && (
              <p className="text-red-500 text-sm mt-1">{generalError}</p>
            )}
          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center mb-4">
            <Checkbox
              {...label}
              defaultChecked
              sx={{
                color: "tomato",
                "&.Mui-checked": { color: "tomato" },
              }}
            />
            <small>
              <Link
                href="/forget_password"
                className="text-tomato hover:underline"
              >
                Forgot Password?
              </Link>
            </small>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-tomato hover:bg-[#cc2b1f] active:scale-95 transition duration-300  py-3 text-white text-xl font-bold shadow-lg"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-3 text-gray-700 font-semibold text-lg">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-tomato hover:underline cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
