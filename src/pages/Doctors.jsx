import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { doctors, getDoctosData } = useContext(AppContext);

  const specialties = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  // Count doctors per specialty for filter badges
  const getSpecialtyCount = (spec) => {
    return doctors.filter((doc) => doc.speciality === spec).length;
  };

  const applyFilter = () => {
    let filtered = doctors;

    // Filter by specialty
    if (speciality) {
      filtered = filtered.filter((doc) => doc.speciality === speciality);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.name?.toLowerCase().includes(query) ||
          doc.speciality?.toLowerCase().includes(query),
      );
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, searchQuery]);

  useEffect(() => {
    getDoctosData();
  }, []);

  return (
    <div className="bg-gray-50/50 h-[calc(100vh-72px)] flex flex-col overflow-hidden">
      {/* Page Header - Compact & Informative */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Find a Doctor
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {filterDoc.length} healthcare professional
                {filterDoc.length !== 1 ? "s" : ""} available
                {speciality && (
                  <span className="text-gray-400"> · {speciality}</span>
                )}
              </p>
            </div>
            {/* Search */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full">
          <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* Sidebar Filters */}
            <div className="lg:w-56 flex-shrink-0">
              <div>
                {/* Mobile Toggle */}
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="w-full lg:hidden mb-3 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  {showFilter ? "Hide Filters" : "Filter by Specialty"}
                </button>

                {/* Filter Options */}
                <div
                  className={`${
                    showFilter ? "block" : "hidden"
                  } lg:block bg-white rounded-xl border border-gray-200 overflow-hidden`}
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Specialty
                    </h3>
                  </div>

                  <div className="p-2">
                    {/* "All Doctors" option */}
                    <button
                      onClick={() => {
                        navigate("/doctors");
                        window.scrollTo(0, 0);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        !speciality
                          ? "bg-primary/10 text-primary"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>All Doctors</span>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-md ${!speciality ? "bg-primary/20 text-primary" : "bg-gray-100 text-gray-500"}`}
                      >
                        {doctors.length}
                      </span>
                    </button>

                    {/* Specialty filters */}
                    {specialties.map((spec) => (
                      <button
                        key={spec}
                        onClick={() => {
                          navigate(`/doctors/${spec}`);
                          window.scrollTo(0, 0);
                          setShowFilter(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          speciality === spec
                            ? "bg-primary/10 text-primary"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className="truncate">{spec}</span>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded-md flex-shrink-0 ${speciality === spec ? "bg-primary/20 text-primary" : "bg-gray-100 text-gray-500"}`}
                        >
                          {getSpecialtyCount(spec)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Doctors Grid - Scrollable */}
            <div className="flex-1 min-w-0 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {filterDoc.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 flex items-center justify-center py-16">
                  <div className="text-center px-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-900 font-medium mb-1">
                      No doctors found
                    </p>
                    <p className="text-gray-500 text-sm">
                      Try selecting a different specialty
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Trust Banner - Social Proof */}
                  <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-200 border-2 border-white"></div>
                      <div className="w-7 h-7 rounded-full bg-emerald-300 border-2 border-white"></div>
                      <div className="w-7 h-7 rounded-full bg-emerald-400 border-2 border-white"></div>
                    </div>
                    <p className="text-sm text-emerald-800">
                      <span className="font-semibold">2,400+</span> appointments
                      booked this week
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filterDoc.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => {
                          navigate(`/appointment/${item._id}`);
                          window.scrollTo(0, 0);
                        }}
                        className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-transparent transition-all duration-300 cursor-pointer group"
                      >
                        {/* Card Content */}
                        <div className="flex items-center gap-4">
                          {/* Avatar */}
                          <div className="relative flex-shrink-0">
                            {item.image ? (
                              <img
                                className="w-16 h-16 rounded-2xl object-cover"
                                src={item.image}
                                alt={item.name}
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                                <span className="text-primary font-semibold text-xl">
                                  {item.name?.charAt(0) || "D"}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-primary transition-colors">
                                {item.name}
                              </h3>
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-blue-500"
                                title="Verified"
                              ></span>
                            </div>
                            <p className="text-sm text-gray-500 mt-0.5">
                              {item.speciality}
                            </p>
                          </div>

                          {/* Price */}
                          <div className="text-right flex-shrink-0">
                            <p className="text-lg font-semibold text-gray-900">
                              ${item.fees || 50}
                            </p>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{item.experience || "5+ yrs exp"}</span>
                            <span
                              className={`inline-flex items-center gap-1.5 ${item.available ? "text-emerald-600" : "text-gray-400"}`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${item.available ? "bg-emerald-500" : "bg-gray-300"}`}
                              ></span>
                              {item.available ? "Available" : "Unavailable"}
                            </span>
                          </div>
                          <svg
                            className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Results footer */}
              {filterDoc.length > 0 && (
                <div className="mt-6 pb-4 flex items-center justify-center">
                  <p className="text-xs text-gray-400">
                    Showing {filterDoc.length} of {filterDoc.length} results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
