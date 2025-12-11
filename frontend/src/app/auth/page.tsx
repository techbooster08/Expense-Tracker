"use client";
import {
  CreateAccountIcon,
  EmailIcon,
  FacebookIcon,
  GoogleIcon,
  PasswordIcon,
  SignInIcon,
  UserIcon,
} from "../../lib/icons";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

// --- Form Components ---
const LoginForm: React.FC = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
          const res = await api.post("/auth/login", {
            email: data.get("email"),
            password: data.get("password"),
          });
          localStorage.setItem("token", res.data.token);
          toast.success("Login Successful", {
            duration: 4000,
          });
          window.location.href = "/home/cashbooks";
      
    } catch (err) {
      toast.error("Login Failed!", {
        duration: 4000,
      });
      console.log(err);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-medium text-gray-700" htmlFor="email">
          Email Address
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <EmailIcon />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your email"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700" htmlFor="password">
          Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <PasswordIcon />
          </div>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your password"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Forgot password?
          </a>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
        >
          <SignInIcon />
          Sign In
        </button>
      </div>
    </form>
  );
};

const RegisterForm: React.FC = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data);

    try {
      const res = await api.post("/auth/register", {
        full_name: data.get("fullname"),
        email: data.get("reg-email"),
        password: data.get("reg-password"),
      });
      toast.success(res.data.message || "Login Successful", {
        duration: 4000,
      });
      console.log(res);
    } catch (err) {
      toast.error("Registration Failed!", {
        duration: 4000,
      });
      console.log(err);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-medium text-gray-700" htmlFor="fullname">
          Full Name
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon />
          </div>
          <input
            type="text"
            name="fullname"
            id="fullname"
            required
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your full name"
          />
        </div>
      </div>
      <div>
        <label
          className="text-sm font-medium text-gray-700"
          htmlFor="reg-email"
        >
          Email Address
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <EmailIcon />
          </div>
          <input
            type="email"
            name="reg-email"
            id="reg-email"
            required
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your email"
          />
        </div>
      </div>
      <div>
        <label
          className="text-sm font-medium text-gray-700"
          htmlFor="reg-password"
        >
          Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <PasswordIcon />
          </div>
          <input
            type="password"
            name="reg-password"
            id="reg-password"
            required
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your password"
          />
        </div>
      </div>
      <div>
        <label
          className="text-sm font-medium text-gray-700"
          htmlFor="confirm-password"
        >
          Confirm Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <PasswordIcon />
          </div>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            required
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Confirm your password"
          />
        </div>
      </div>
      <div className="pt-2">
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
        >
          <CreateAccountIcon />
          Create Account
        </button>
      </div>
    </form>
  );
};

// --- Main Auth Component ---

const Auth: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center font-sans text-gray-800 relative ">
      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 mt-4">
        {/* Header */}
        <div className="text-center mb-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Image
              src={"/logo-expense-tracker.png"}
              height={40}
              width={200}
              alt="logo"
            />
          </div>
          <p className="text-gray-500">Manage your finances with ease</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-2">
          <button
            onClick={() => setActiveTab("login")}
            className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-colors duration-300 ${
              activeTab === "login"
                ? "bg-white shadow-md text-blue-600"
                : "text-gray-500 hover:bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-colors duration-300 ${
              activeTab === "register"
                ? "bg-white shadow-md text-blue-600"
                : "text-gray-500 hover:bg-gray-200"
            }`}
          >
            Register
          </button>
        </div>

        {/* Conditional Form */}
        {activeTab === "login" ? <LoginForm /> : <RegisterForm />}

        {/* Divider */}
        <div className="my-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="w-full inline-flex justify-center items-center gap-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <GoogleIcon />
            Google
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center items-center gap-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <FacebookIcon />
            Facebook
          </button>
        </div>

        {/* Terms of Service */}
        {activeTab === "register" && (
          <p className="mt-6 text-xs text-center text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="#" className="font-medium text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        )}
      </div>

      {/* Footer Links */}
      <div className="mt-8 text-center text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          &larr; Back to homepage
        </Link>
      </div>
    </div>
  );
};

export default Auth;
