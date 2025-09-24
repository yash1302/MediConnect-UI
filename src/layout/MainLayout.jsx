import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Outlet />
      {location.pathname !== "/chat" && <Footer />}
    </div>
  );
};

export default MainLayout;
