"use client";
import Avatar from "@/components/Avatar";
import {} from "../../../lib/data";
import Image from "next/image";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        {/* nav bar */} 
        <header className="w-full fixed top-0 z-50 bg-white shadow-sm">
          <div className=" mx-auto px-4  flex items-center justify-between h-16">
            <div className="flex items-center gap-2 ">
              <Image
                src={"/logo-expense-tracker.png"}
                alt="logo"
                height={60}
                width={200}
              />
            </div>

            <Avatar />
            
          </div>
        </header> 

        {children}
    </>
  );
}
