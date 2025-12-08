"use client";
import React, { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import api from "@/app/services/api";
import toast from "react-hot-toast";

const Avatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const habdleLogout = async ()=>{
    await api.post("/auth/logout");
    toast.success("Logout Successful", {
      duration: 4000,
    });
    window.location.href = "/auth";
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
      >
        <User className="text-gray-500" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Settings size={16} />
            Settings
          </Link>
          <button
          onClick={habdleLogout}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
