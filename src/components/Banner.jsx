import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Banner = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const features = [
    "Unlimited appointments",
    "Video consultations",
    "Health records storage",
    "Direct doctor messaging",
    "Automated reminders",
  ];

  return (
    <section className="bg-[#E8E9F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <div>
            <p className="text-primary font-medium text-sm mb-4">
              Healthcare appointment platform
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight mb-4">
              Get started for free
            </h2>
            <p className="text-gray-500 mb-8">*No credit card required</p>
            <button
              onClick={() => {
                navigate(token ? "/doctors" : "/login");
                scrollTo(0, 0);
              }}
              className="bg-primary text-white px-10 py-4 rounded-full text-base font-semibold hover:bg-primary/90 transition-all w-full sm:w-auto"
            >
              Start for free
            </button>
          </div>

          {/* Right Side - Pricing Card */}
          <div className="relative">
            {/* Decorative gradient blob */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-violet-300/50 to-blue-300/50 rounded-full blur-2xl"></div>

            <div className="relative bg-white rounded-2xl p-8 shadow-xl">
              {/* Decorative corner gradient */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-200/60 to-transparent rounded-tr-2xl"></div>

              <div className="relative">
                {/* Price Header */}
                <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-gray-100">
                  <span className="text-2xl font-bold text-primary">Free</span>
                  <div>
                    <span className="text-4xl font-bold text-gray-900">$0</span>
                    <span className="text-gray-500 text-lg">/usd</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-primary flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
