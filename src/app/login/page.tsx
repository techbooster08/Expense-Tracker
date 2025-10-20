"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// --- SVG Icon Components ---

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"
    />
  </svg>
);

const PasswordIcon = () => (
  <svg
    xmlns="http://www.w.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const SignInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M44.5 24H24v8.5h11.8C34.7 36.8 30.1 40 24 40c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 7.9 3.1L38 7.9C34.2 4.5 29.5 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
      fill="#FFC107"
    />
    <path
      d="M44.5 24H24v8.5h11.8C34.7 36.8 30.1 40 24 40c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 7.9 3.1L38 7.9C34.2 4.5 29.5 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
      fill="url(#paint0_linear)"
    />
    <path
      d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24z"
      fill="url(#paint1_radial)"
      fillOpacity=".2"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="24"
        y1="2"
        x2="24"
        y2="40"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF3D00" />
        <stop offset="1" stopColor="#FFC107" />
      </linearGradient>
      <radialGradient
        id="paint1_radial"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(24) rotate(90) scale(48)"
      >
        <stop stopColor="rgba(255,255,255,0.4)" />
        <stop offset="1" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>
  </svg>
);

const FacebookIcon = () => (
  <svg
    className="w-5 h-5"
    fill="#1877F2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h5.698c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z" />
  </svg>
);

// --- Main App Component ---

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center  font-sans text-gray-800">
      {/* Header */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
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

        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
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

        {/* Form */}
        <form className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="email"
            >
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="password"
            >
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Remember me & Forgot Password */}
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
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Sign In Button */}
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

export default Login;
