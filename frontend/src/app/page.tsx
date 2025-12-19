"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Book,
  Car,
  CheckCircle,
  CircleHelp,
  Facebook,
  Github,
  HomeIcon,
  Instagram,
  Linkedin,
  Lock,
  LogIn,
  Mail,
  Menu,
  Play,
  Plus,
  Twitter,
  UtensilsCrossed,
  X,
} from "lucide-react";
import {
  companyLinks,
  featureLinks,
  featuresData,
  stepsData,
} from "../lib/data";
import Link from "next/link";

const navLinks = [
  { href: "/#home", label: "Home", icon: <HomeIcon className="h-5 w-5" /> },
  { href: "/#features", label: "Features", icon: <Plus className="h-5 w-5" /> },
  {
    href: "/#how-it-works",
    label: "How it Works",
    icon: <CircleHelp className="h-5 w-5" />,
  },
  {
    href: "/#resources",
    label: "Resources",
    icon: <Book className="h-5 w-5" />,
  },
  { href: "/#demo", label: "Demo", icon: <Play className="h-5 w-5" /> },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* nav bar */}
      <header className="w-full fixed top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto px-4  flex items-center justify-between h-16">
          <div className="flex items-center gap-2 ">
            <Image
              src={"/logo-expense-tracker.png"}
              alt="logo"
              height={60}
              width={200}
            />
          </div>
          <nav className="hidden md:flex flex-1 items-center justify-center gap-6 text-lg text-gray-700 relative">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                className="hover:text-blue-600 font-semibold text-md whitespace-nowrap"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4 min-w-max">
            <Link
              href={"/auth"}
              className="text-md cursor-pointer bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition"
            >
              login / register
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
              <Menu className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 md:hidden ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`fixed top-0 right-0 h-full w-72 bg-gray-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Image
                src={"/logo-expense-tracker.png"}
                alt="logo"
                width={150}
                height={40}
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-full hover:bg-gray-200"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow p-4">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 font-medium"
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Menu Footer */}
            <div className="p-4 border-t border-gray-200">
              <Link
                href={"/auth"}
                className="w-full text-md cursor-pointer bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-3 rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
              >
                <LogIn className="h-5 w-5" />
                <span>Login / Register</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* hero section */}
        <section
          className="relative pt-25 pb-15  overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white"
          id="home"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Left Content */}
              <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                <div className="inline-flex items-center rounded-full border border-blue-100 bg-white px-3 py-1 text-sm font-medium text-blue-600 mb-6 shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                  New: Smart Budgeting Features
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
                  Take Control of Your <br className="hidden lg:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Financial Future
                  </span>
                </h1>
                <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  The most intuitive expense tracking application. Manage
                  multiple cashbooks, set smart budgets, and gain valuable
                  insights into your spending patterns.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/auth"
                    className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                  >
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="#demo"
                    className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Link>
                </div>
                <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">
                      No credit card required
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Lock className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">
                      Secure & Private
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Content - Expense Card */}
              <div className="relative mt-12 lg:mt-0 w-full max-w-lg mx-auto lg:max-w-none">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

                <div className="relative bg-white/80 backdrop-blur-xl text-gray-800 rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-transform hover:scale-[1.02] duration-500">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                        Total Balance
                      </h3>
                      <span className="text-4xl font-extrabold text-gray-900 mt-1 block">
                        ₹42,534.00
                      </span>
                    </div>
                    <div className="bg-green-50 p-2 rounded-lg border border-green-100">
                      <span className="text-green-600 font-bold text-sm flex items-center">
                        <Plus className="h-4 w-4 mr-1" /> 12.5%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="bg-red-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                          <UtensilsCrossed className="h-6 w-6 text-red-500" />
                        </div>
                        <div>
                          <span className="block font-bold text-gray-900">
                            Food & Dining
                          </span>
                          <span className="text-xs text-gray-500">
                            Nov 24, 2024
                          </span>
                        </div>
                      </div>
                      <span className="font-semibold text-red-500">
                        -₹1,240
                      </span>
                    </div>

                    <div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                          <Car className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <span className="block font-bold text-gray-900">
                            Transportation
                          </span>
                          <span className="text-xs text-gray-500">
                            Nov 23, 2024
                          </span>
                        </div>
                      </div>
                      <span className="font-semibold text-red-500">-₹890</span>
                    </div>

                    <div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                          <Plus className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                          <span className="block font-bold text-gray-900">
                            Freelance Income
                          </span>
                          <span className="text-xs text-gray-500">
                            Nov 20, 2024
                          </span>
                        </div>
                      </div>
                      <span className="font-semibold text-green-500">
                        +₹25,000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div
                  className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden md:flex items-center gap-3 animate-bounce"
                  style={{ animationDuration: "3s" }}
                >
                  <div className="bg-green-100 rounded-full p-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Budget Status
                    </p>
                    <p className="text-sm font-bold text-gray-900">On Track</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* features Section */}
        <section className="bg-gray-50 py-10" id="features">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-shadow-2xs text-gray-900">
                Everything You Need for Financial Management
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Our comprehensive suite of tools makes expense tracking simple,
                insightful, and effective for everyone.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuresData.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                    <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
                      {React.isValidElement(feature.icon) 
                        ? React.cloneElement(feature.icon as React.ReactElement<any>, { className: "h-7 w-7" })
                        : feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section className="bg-gray-50 py-10" id="how-it-works">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Get started in minutes and take control of your finances with our simple process.
              </p>
            </div>
            
            <div className="relative grid gap-12 md:grid-cols-3">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10"></div>
              
              {stepsData.map((step, index) => (
                <div key={step.number} className="relative flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-8 border-4 border-blue-50 z-10 group-hover:border-blue-100 group-hover:scale-110 transition-all duration-300">
                    <span className="text-3xl font-bold text-blue-600">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Software in Action Section*/}
        <section className="bg-white py-10 overflow-hidden" id="resources">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 mb-4">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                Interface Preview
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Designed for Clarity and Speed
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Experience a clutter-free environment that puts your financial data front and center.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Card 1 */}
              <div className="group relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white transform hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex items-center px-4 gap-2 z-10">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="pt-8 relative">
                  <img
                    src="SIA-v1-1.png"
                    alt="Dashboard Overview"
                    className="w-full h-[300px] sm:h-[400px] object-contain"
                  />
                  
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-900 transform hover:-translate-y-1 transition-transform duration-300 lg:mt-0">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex items-center px-4 gap-2 z-10">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="pt-8 relative">
                  <img
                    src="SIA-v1-2.png"
                    alt="Budget Tracking"
                    className="w-full h-[300px] sm:h-[400px] object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="relative py-24 bg-blue-600 overflow-hidden"
          id="demo"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
             </svg>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of users who are already making smarter financial decisions. 
              Start your journey today—completely free.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/auth" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-blue-600 bg-white rounded-full hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <Lock className="mr-2 h-5 w-5" />
                Get Started Now
              </Link>
              <Link 
                href="#features" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white border-2 border-blue-400 bg-blue-600/50 rounded-full hover:bg-blue-500 transition-all duration-200 backdrop-blur-sm"
              >
                <CircleHelp className="mr-2 h-5 w-5" />
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Column 1: Logo and Description */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/">
                <span className="text-xl font-bold text-white">
                  ExpenseTracker
                </span>
              </Link>
              <p className="text-sm max-w-xs pt-2">
                The most intuitive way to track expenses, manage budgets, and
                gain financial insights.
              </p>
            </div>

            {/* Column 2: Features */}
            <div>
              <h3 className="font-bold text-white mb-4">Features</h3>
              <ul className="space-y-2">
                {featureLinks.map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Connect */}
            <div>
              <h3 className="font-bold text-white mb-4">Connect</h3>
              <div className="mb-6">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
                  Developed by
                </p>
                <div className="inline-block group cursor-pointer">
                  <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400">
                    Akash Pawar
                  </span>
                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300"></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://www.linkedin.com/in/techbooster-akash-pawar/"
                  aria-label="LinkedIn"
                  className="bg-gray-800 hover:bg-blue-900/50 p-2.5 rounded-full transition-all duration-300 border border-gray-700 hover:border-blue-500 group"
                >
                  <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-blue-400" />
                </Link>
                <Link
                  href="https://github.com/techbooster08/"
                  aria-label="GitHub"
                  className="bg-gray-800 hover:bg-gray-700 p-2.5 rounded-full transition-all duration-300 border border-gray-700 hover:border-gray-500 group"
                >
                  <Github className="h-5 w-5 text-gray-400 group-hover:text-white" />
                </Link>
                <Link
                  href="https://medium.com/@akashpawar.dev"
                  aria-label="Medium"
                  className="bg-gray-800 hover:bg-gray-700 p-2.5 rounded-full transition-all duration-300 border border-gray-700 hover:border-gray-500 group"
                >
                  <svg
                    className="h-5 w-5 text-gray-400 group-hover:text-white fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/akash_pawar_9999_"
                  aria-label="Instagram"
                  className="bg-gray-800 hover:bg-pink-900/50 p-2.5 rounded-full transition-all duration-300 border border-gray-700 hover:border-pink-500 group"
                >
                  <Instagram className="h-5 w-5 text-gray-400 group-hover:text-pink-400" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-6 flex  justify-center items-center">
            <p className="text-sm text-center sm:text-left mb-4 sm:mb-0">
              &copy; {new Date().getFullYear()} ExpenseTracker. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
