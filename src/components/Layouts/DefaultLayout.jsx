"use client";
import React, { useState, ReactNode } from "react";
import SideBar from "@/components/Sidebar/SideBar";
import NavBar from "@/components/Header/NavBar";
import Footer from "../footer/Footer";

export default function DefaultLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      {/* <div className="flex h-screen overflow-hidden"> */}
      {/* <!-- ===== Sidebar Start ===== --> */}
      {/* <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      {/* <!-- ===== Sidebar End ===== --> */}

      {/* <!-- ===== Content Area Start ===== --> */}
      {/* <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"> */}
      {/* <!-- ===== Header Start ===== --> */}
      <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <!-- ===== Header End ===== --> */}

      {/* <!-- ===== Main Content Start ===== --> */}
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 mb-20">
          {children}
        </div>
      </main>
      <Footer />
      {/* <!-- ===== Main Content End ===== --> */}
      {/* </div> */}
      {/* <!-- ===== Content Area End ===== --> */}
      {/* </div> */}
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
