"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/features/hooks";
import Link from "next/link";
import OAuth from "../../OAuth/OAuth.jsx";
import { FiEyeOff } from "react-icons/fi";
import { Divider } from "@mui/material";
import Image from "next/image";
import { FiEye } from "react-icons/fi";
import EmailOTPF from "@/components/EmailOTP_MODAL/EmailOTPF.jsx";

const Signup = () => {
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  // const { loading, error } = useAppSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    image: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirm_password: "",
    role: "",
    registration_date: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };
  const handleImageChange = (e) => {
    const imgFile = e.target.files[0];
    setFormData({
      ...formData,
      image: imgFile,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newFormErrors = { ...formErrors };

    // const imgResponse = await fetch("/img/user.png");
    // const imgBlob = await imgResponse.blob();

    if (formData.name.trim() === "") {
      newFormErrors.name = "Name is required";
      isValid = false;
    } else {
      const minNameLength = 2;
      const maxNameLength = 150;
      if (
        formData.name.trim().length < minNameLength ||
        formData.name.trim().length > maxNameLength
      ) {
        newFormErrors.name = `Name must be between ${minNameLength} and ${maxNameLength} characters`;
        isValid = false;
      }
    }

    if (formData.email.trim() === "") {
      newFormErrors.email = "Email is required";
      isValid = false;
    } else {
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newFormErrors.email = "Invalid email format";
        isValid = false;
      }

      const maxEmailLength = 150;
      if (formData.email.trim().length > maxEmailLength) {
        newFormErrors.email = `Email must be ${maxEmailLength} characters or less`;
        isValid = false;
      }
    }

    if (formData.phone.trim() === "") {
      newFormErrors.phone = "Phone number if required";
      isValid = false;
    } else if (formData.phone.length < 11) {
      newFormErrors.phone = "Invalid Phone Number";
      isValid = false;
    }

    // if (formData.address.trim() === "") {
    //   newFormErrors.address = "Address is required";
    //   isValid = false;
    // }
    if (formData.password !== formData.confirm_password) {
      newFormErrors.confirm_password = "Confirm Password didn't match";
      isValid = false;
    }

    // const phoneNumberRegex = /^\d{10,15}$/;
    // if (formData.phone.trim() === "") {
    //   newFormErrors.phone = "Phone number is required";
    //   isValid = false;
    // } else if (!phoneNumberRegex.test(formData.phone.trim())) {
    //   newFormErrors.phone = "Invalid phone number format";
    //   isValid = false;
    // }

    if (formData.password.trim() === "") {
      newFormErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newFormErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    // if (formData.role.trim() === "") {
    //   newFormErrors.role = "Role is required";
    //   isValid = false;
    // }

    // if (formData.registration_date.trim() === "") {
    //   newFormErrors.registration_date = "Registration date is required";
    //   isValid = false;
    // }
    if (formData.confirm_password.trim() === "") {
      newFormErrors.confirm_password = "Confirm Password is required";
    }

    const newFormData = new FormData();

    newFormData.append("name", formData?.name);
    newFormData.append("email", formData?.email);
    newFormData.append("address", "address");
    newFormData.append("phone", formData?.phone);
    newFormData.append("password", formData?.password);
    newFormData.append("registration_date", new Date().toISOString());
    newFormData.append("role", "user");
    newFormData.append("defaultPicture", formData?.image);

    if (isValid) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/signup`,
          newFormData,

          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response);

        if (response.status === 201) {
          setOtpModalOpen(true);
          setEmail(newFormData.get("email"));
        } else {
          console.error("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Error during signup:", error.response || error.message);
      }
    } else {
      setFormErrors(newFormErrors);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#fff5f5] px-4">
      <div className="bg-white  shadow-2xl max-w-md w-full p-6 relative mb-5 mt-3">
        {/* Top bar with tomato background */}
        <div className="absolute top-0 left-0 w-full bg-tomato py-2 ">
          <h2 className="text-white text-2xl font-extrabold text-center tracking-wide">
            Create Your Account
          </h2>
        </div>

        {/* Spacer for top bar */}
        <div className="pt-10 text-center mb-4">
          <span className="text-[#9F9F9F] text-lg block">
            Please enter your details
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full p-2 border border-[#E8E8F2] rounded-xl focus:outline-none focus:ring-2 focus:ring-tomato"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 border border-[#E8E8F2] rounded-xl focus:outline-none focus:ring-2 focus:ring-tomato"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full p-2 border border-[#E8E8F2] rounded-xl focus:outline-none focus:ring-2 focus:ring-tomato"
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border border-[#E8E8F2] rounded-xl focus:outline-none focus:ring-2 focus:ring-tomato"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute opacity-60 right-3 top-1/2 -translate-y-1/2 hover:opacity-100 transition"
            >
              {showPass || formData.password === "" ? (
                <FiEyeOff className="text-xl text-tomato" />
              ) : (
                <FiEye className="text-xl text-tomato" />
              )}
            </button>
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-2 border border-[#E8E8F2] rounded-xl focus:outline-none focus:ring-2 focus:ring-tomato"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute opacity-60 right-3 top-1/2 -translate-y-1/2 hover:opacity-100 transition"
            >
              {showPass || formData.confirm_password === "" ? (
                <FiEyeOff className="text-xl text-tomato" />
              ) : (
                <FiEye className="text-xl text-tomato" />
              )}
            </button>
            {formErrors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.confirm_password}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <input
              type="file"
              name="image"
              className="p-1 border file:text-white file:bg-tomato file:border-0 file:p-2 file:rounded-s-md border-gray-300 w-full rounded-md"
              onChange={handleImageChange}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-tomato hover:bg-[#cc2b1f] text-white text-xl font-bold py-3  shadow-lg active:scale-95 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect to Login */}
        <Link href="/signin">
          <h6 className="text-center mt-4 font-semibold text-lg text-gray-700">
            Already have an account?{" "}
            <span className="text-tomato hover:underline">Sign In</span>
          </h6>
        </Link>
      </div>

      {/* Optional Email OTP Modal */}
      <EmailOTPF otpModalOpen={otpModalOpen} email={email} />
    </section>
  );
};

export default Signup;
