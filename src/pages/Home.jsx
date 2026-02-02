import React, { useEffect } from "react";
import Header from "../components/Header";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      <FeaturesSection />
      <TopDoctors />
      <TestimonialsSection />
      <Banner />
    </div>
  );
};

export default Home;
