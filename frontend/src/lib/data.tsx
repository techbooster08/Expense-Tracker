import React from "react";
import {
  BookCopy,
  Clock,
  BarChart2,
  Download,
  MousePointerClick,
  ShieldCheck,
} from "lucide-react";

// data for public webpage features section
export const featuresData = [
  {
    icon: <BookCopy className="h-6 w-6 text-blue-600" />,
    title: "Multiple Cashbooks",
    description:
      "Organize expenses across different categories like personal, business, travel, and more.",
  },
  {
    icon: <Clock className="h-6 w-6 text-blue-600" />,
    title: "Smart Budgeting",
    description:
      "Set budgets for different categories and track your spending progress with visual indicators.",
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-blue-600" />,
    title: "Detailed Reports",
    description:
      "Get comprehensive insights with charts, trends, and financial analytics to make better decisions.",
  },
  {
    icon: <Download className="h-6 w-6 text-blue-600" />,
    title: "Export Data",
    description:
      "Export your transactions in multiple formats including CSV, Excel, and PDF for record keeping.",
  },
  {
    icon: <MousePointerClick className="h-6 w-6 text-blue-600" />,
    title: "Easy to Use",
    description:
      "Clean, intuitive interface that makes expense tracking simple and efficient for everyone.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
    title: "Secure & Private",
    description:
      "Your financial data is safe and secure with modern security practices and privacy protection.",
  },
];

export const stepsData = [
  {
    number: 1,
    title: "Create Your Cashbooks",
    description:
      "Set up separate cashbooks for different expense categories like personal, business, or travel.",
  },
  {
    number: 2,
    title: "Track Transactions",
    description:
      "Add your income and expenses quickly with detailed categorization and payment methods.",
  },
  {
    number: 3,
    title: "Analyze & Optimize",
    description:
      "Get detailed reports, set budgets, and make informed decisions about your spending.",
  },
];


// footer data
export const featureLinks = [
  "Multiple Cashbooks",
  "Budget Management",
  "Financial Reports",
  "Data Export",
];
export const companyLinks = [
  "About Us",
  "Privacy Policy",
  "Terms of Service",
  "Contact",
];
