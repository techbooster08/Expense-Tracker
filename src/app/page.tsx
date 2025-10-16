import React from "react";
import { Wallet, Car, Play, Plus, UtensilsCrossed } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
    {/* nav bar */}
      <header>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side: Logo and App Name */}
            <div className="flex items-center">
              <a href="#" className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800">
                  Expense Tracker
                </span>
              </a>
            </div>

            {/* Right side: Get Started Button */}
            <div>
              <button className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors duration-300">
                Get Started
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* hero section */}
        <section className="relative bg-gray-800 text-white py-20 sm:py-32">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/hero-sec.jpg"
              alt="Financial dashboard on a computer screen"
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
      </main>
    </>
  );
}
