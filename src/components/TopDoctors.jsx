import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Our Experts
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Top-rated doctors
            </h2>
            <p className="text-gray-600 text-lg">
              Book with our verified healthcare professionals
            </p>
          </div>
          <button
            onClick={() => {
              navigate("/doctors");
              scrollTo(0, 0);
            }}
            className="bg-white text-primary border border-primary/20 px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all inline-flex items-center gap-2 self-start sm:self-auto"
          >
            View all doctors
            <svg
              className="w-4 h-4"
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
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.slice(0, 4).map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group border border-gray-100"
              key={index}
            >
              <div className="relative overflow-hidden">
                <img
                  className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={item.image}
                  alt={item.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <span
                  className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    item.available
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {item.available ? "● Available" : "Unavailable"}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-primary text-sm font-medium">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;
