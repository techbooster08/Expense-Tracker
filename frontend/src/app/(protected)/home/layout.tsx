"use client";
import Avatar from "@/components/Avatar";
import {} from "../../../lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/app/services/api";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; full_name: string; email: string } | null>(null);

  useEffect(()=>{
    const verifyUser = async () => {
         try{
          const res = await api.get("/user/verify");
          setIsAuthenticated(true);
          localStorage.setItem("user",JSON.stringify(res.data.user));
          setUser(res.data.user);
         }catch(error){
          console.log(error);
          toast.error("Not Authenticated", {
            duration: 5000,
          });
         }
    }
    verifyUser();
  },[]);
  return authenticated && (
    <>
        {/* nav bar */} 
        <header className="w-full fixed top-0 z-50 bg-white shadow-sm">
          <div className=" mx-auto px-4  flex items-center justify-between h-16">
            <div className="flex items-center gap-2 ">
              <Image
                src={"/logo-expense-tracker.png"}
                alt="logo"
                height={50}
                width={160}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-full">
              <p className="font-semibold text-right capitalize">{user?.full_name}</p>
              </div>
              <Avatar />
            </div>
            
          </div>
        </header> 

        {children}
    </>
  );
}
