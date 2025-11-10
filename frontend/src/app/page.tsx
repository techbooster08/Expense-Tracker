"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Book,
  Car,
  CircleHelp,
  Facebook,
  HomeIcon,
  Linkedin,
  Lock,
  LogIn,
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 min-w-max">
            <Image
              src={"/logo-expense-tracker.png"}
              alt="logo"
              height={60}
              width={200}
            />
          </div>
          <nav className="hidden md:flex flex-1 items-center justify-center gap-6 text-sm text-gray-700 relative">
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
            <Link href={'/auth'} className="text-md cursor-pointer bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition">
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
              <Link href={'/auth'} className="w-full text-md cursor-pointer bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-3 rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2">
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
          className="relative bg-gray-800 text-white py-20 sm:py-32"
          id="home"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/hero-sec.jpg"
              alt="Financial dashboard on Link computer screen"
              className="w-full h-full object-cover"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-blue-600/70 backdrop-blur-[2px] opacity-80"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="max-w-xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl  font-bold leading-tight">
                  Take Control of Your
                  <br />
                  <span className="text-yellow-400">Finances</span>
                </h1>
                <p className="mt-6 text-lg text-white">
                  The most intuitive expense tracking application that helps you
                  manage multiple cashbooks, set smart budgets, and gain
                  valuable insights into your spending patterns.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Start Tracking Now
                  </button>
                  <button className="bg-blue-600 bg-opacity-25 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-opacity-40 transition-colors duration-300 flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Watch Demo
                  </button>
                </div>
              </div>

              {/* Right Content - Expense Card */}
              <div className="mt-12 lg:mt-0">
                <div className="bg-white/95 backdrop-blur-sm text-gray-800 rounded-2xl shadow-2xl p-6 transform transition-transform hover:scale-105 duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">November Expenses</h3>
                    <span className="text-2xl font-bold text-green-600">
                      ₹17,534
                    </span>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-red-100 p-2 rounded-full">
                          <UtensilsCrossed className="h-5 w-5 text-red-500" />
                        </div>
                        <span>Food & Dining</span>
                      </div>
                      <span className="font-semibold text-red-500">
                        -₹1,240
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Car className="h-5 w-5 text-blue-500" />
                        </div>
                        <span>Transportation</span>
                      </div>
                      <span className="font-semibold text-red-500">-₹890</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Plus className="h-5 w-5 text-green-500" />
                        </div>
                        <span>Freelance Income</span>
                      </div>
                      <span className="font-semibold text-green-500">
                        +₹25,000
                      </span>
                    </li>
                  </ul>
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
              <p className="mt-4 text-lg text-gray-600">
                Our comprehensive suite of tools makes expense tracking simple,
                insightful, and effective for individuals and businesses alike.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuresData.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                >
                  <div className="bg-blue-100 inline-block p-3 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section className="bg-blue-50 py-10" id="how-it-works">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Simple steps to better financial management
              </p>
            </div>
            <div className="mt-10 grid gap-12 md:grid-cols-3">
              {stepsData.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Software in Action Section*/}
        <section className="bg-white pt-10 pb-20" id="resources">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                See It In Action
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Beautiful, intuitive interface designed for efficiency
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
              {/* Desktop Dashboard Card */}
              <div className="relative rounded-2xl shadow-xl w-full max-w-2xl">
                <img
                  src="SIA-1.jpg"
                  alt="Dashboard Overview"
                  className="rounded-lg shadow-lg w-full"
                />
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-md text-center max-sm:w-60">
                  <h4 className="font-semibold text-gray-800">
                    Dashboard Overview
                  </h4>
                  <p className="text-sm text-gray-600">
                    Complete financial summary
                  </p>
                </div>
              </div>

              <div className="relative mt-10 lg:mt-0 rounded-2xl shadow-xl w-full max-w-2xl">
                <img
                  src="SIA-2.jpg"
                  alt="Dashboard Overview"
                  className="rounded-lg shadow-lg w-full"
                />
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-md text-center max-sm:w-50">
                  <h4 className="font-semibold text-gray-800">
                    Budget Tracking
                  </h4>
                  <p className="text-sm text-gray-600">Smart spending limits</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="relative bg-linear-to-r from-indigo-600 via-blue-500 to-indigo-600 text-white overflow-hidden dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
          id="demo"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-15 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="mt-4 text-lg text-blue-200 max-w-2xl mx-auto">
              Join thousands of users who have already transformed their
              financial management. Start your journey to better financial
              health today.
            </p>
            <div className="mt-8 flex justify-center flex-wrap gap-4">
              <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Get Started for Free
              </button>
              <button className="bg-transparent text-white font-semibold px-6 py-3 rounded-lg border border-white hover:bg-white hover:text-blue-600 transition-colors duration-300 flex items-center gap-2">
                <CircleHelp className="h-5 w-5" />
                Learn More
              </button>
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
              <div className="flex space-x-4">
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="bg-gray-700 hover:bg-blue-500 p-2 rounded-full transition-colors"
                >
                  <Twitter className="h-5 w-5 text-white" />
                </Link>
                <Link
                  href="#"
                  aria-label="LinkedIn"
                  className="bg-gray-700 hover:bg-blue-600 p-2 rounded-full transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-white" />
                </Link>
                <Link
                  href="#"
                  aria-label="Facebook"
                  className="bg-gray-700 hover:bg-blue-700 p-2 rounded-full transition-colors"
                >
                  <Facebook className="h-5 w-5 text-white" />
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
