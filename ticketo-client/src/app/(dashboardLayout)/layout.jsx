"use client";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Toaster } from "react-hot-toast";

const DashBoardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-[#080c16]">
      <DashboardSidebar />
      <Toaster />
      <div className="px-6 py-10 max-w-7xl w-full mx-auto">{children}</div>
    </div>
  );
};

export default DashBoardLayout;
