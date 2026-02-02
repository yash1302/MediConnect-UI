import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId,
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  if (relDoc.length === 0) return null;

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Similar Doctors</h2>
          <p className="text-sm text-gray-500 mt-1">
            Other {speciality}s you might like
          </p>
        </div>
        <a
          href={`/doctors/${speciality}`}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View all
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relDoc.slice(0, 3).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="bg-white border border-gray-100 rounded-xl p-4 cursor-pointer hover:shadow-md hover:border-transparent transition-all duration-200 group"
            key={index}
          >
            <div className="flex items-center gap-4">
              <img
                className="w-16 h-16 rounded-xl object-cover bg-gradient-to-br from-primary/10 to-primary/5"
                src={item.image}
                alt={item.name}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 truncate group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {item.speciality}
                </p>
                <div
                  className={`flex items-center gap-1.5 mt-1 text-xs font-medium ${item.available ? "text-emerald-600" : "text-gray-400"}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${item.available ? "bg-emerald-500" : "bg-gray-300"}`}
                  ></span>
                  {item.available ? "Available" : "Not Available"}
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
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
    </div>
  );
};

export default RelatedDoctors;
