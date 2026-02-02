import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content with top padding for fixed navbar */}
      <main className="pt-[72px]">
        <Outlet />
      </main>

      {location.pathname !== "/chat" && <Footer />}
    </div>
  );
};

export default MainLayout;
