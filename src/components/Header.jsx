import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Trusted by 500+ healthcare professionals
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Book appointments with{" "}
              <span className="text-primary">trusted doctors</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Connect with verified healthcare professionals and schedule your
              visit in minutes. Your health, simplified.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/doctors")}
                className="bg-primary text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 inline-flex items-center justify-center gap-2"
              >
                Find a doctor
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              <button
                onClick={() => navigate("/about")}
                className="bg-white text-gray-700 px-8 py-4 rounded-xl text-base font-semibold hover:bg-gray-50 transition-all border border-gray-200 inline-flex items-center justify-center gap-2"
              >
                Learn more
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
                <div className="text-center lg:text-left">
                  <p className="text-3xl font-bold text-gray-900">50K+</p>
                  <p className="text-sm text-gray-500">Patients served</p>
                </div>
                <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>
                <div className="text-center lg:text-left">
                  <p className="text-3xl font-bold text-gray-900">500+</p>
                  <p className="text-sm text-gray-500">Verified doctors</p>
                </div>
                <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>
                <div className="text-center lg:text-left">
                  <p className="text-3xl font-bold text-gray-900">98%</p>
                  <p className="text-sm text-gray-500">Satisfaction rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-4">
              <img
                className="w-full rounded-2xl"
                src={assets.header_img}
                alt="Healthcare professionals"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
