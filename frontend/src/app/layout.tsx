import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";



export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Manage all your expenses in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
