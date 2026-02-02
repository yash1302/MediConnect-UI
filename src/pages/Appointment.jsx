import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";
import { bookAppointment } from "../utils/Api.utils";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, token, getDoctosData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(false);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSolts = async () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const handleBookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      return toast.warning("Select slot time to book appointment");
    }

    const date = docSlots[slotIndex][0].datetime;

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const slotDate = day + "_" + month + "_" + year;

    try {
      setLoading(true);
      const { data } = await bookAppointment({ docId, slotDate, slotTime });
      if (data) {
        toast.success(data.message);
        getDoctosData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSolts();
    }
  }, [docInfo]);

  useEffect(() => {
    if (docSlots.length > 0) {
      // Find first date with available slots
      const firstAvailableDateIndex = docSlots.findIndex(
        (slots) => slots.length > 0,
      );

      if (firstAvailableDateIndex !== -1) {
        setSlotIndex(firstAvailableDateIndex);
        // Set first time slot of that date
        setSlotTime(docSlots[firstAvailableDateIndex][0].time);
      }
    }
  }, [docSlots]);

  return docInfo ? (
    <div className="bg-gray-50/50 min-h-screen pb-8">
      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
            <div className="text-center">
              <p className="text-gray-900 font-semibold">
                Confirming your appointment...
              </p>
              <p className="text-sm text-gray-500 mt-1">
                This will just take a moment
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a href="/doctors" className="hover:text-primary transition-colors">
            Doctors
          </a>
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
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-gray-900">{docInfo.name}</span>
        </nav>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Doctor Image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover bg-gradient-to-br from-primary/10 to-primary/5"
                        src={docInfo.image}
                        alt={docInfo.name}
                      />
                      {/* Availability Badge */}
                      {docInfo.available && (
                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                          Available
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1">
                    {/* Name & Verification */}
                    <div className="flex items-start gap-2 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {docInfo.name}
                      </h1>
                      <div
                        className="flex-shrink-0 mt-1"
                        title="Verified Doctor"
                      >
                        <svg
                          className="w-5 h-5 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Credentials */}
                    <p className="text-gray-600 mb-3">
                      {docInfo.degree} · {docInfo.speciality}
                    </p>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {docInfo.experience}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                        <svg
                          className="w-4 h-4 text-amber-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        4.9 (127 reviews)
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors">
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
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                        Share Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                About
              </h2>
              <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>

              {/* Highlights */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Board Certified
                      </p>
                      <p className="text-xs text-gray-500">
                        Verified credentials
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        10,000+ Patients
                      </p>
                      <p className="text-xs text-gray-500">
                        Treated successfully
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-white to-gray-50/50 rounded-3xl border border-gray-100 p-6 sticky top-24 shadow-sm">
              {/* Price Header */}
              <div className="mb-6 pb-5 border-b border-gray-100">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-1">
                      Consultation
                    </p>
                    <p className="text-3xl font-bold text-gray-900 tracking-tight">
                      {currencySymbol}
                      {docInfo.fees}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Available
                  </span>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Pick a date
                </p>
                <div className="flex gap-2">
                  {docSlots.length > 0 &&
                    docSlots
                      .map((item, index) => ({ item, index }))
                      .filter(({ item }) => item.length > 0)
                      .slice(0, 5)
                      .map(({ item, index }) => {
                        const isToday =
                          item[0]?.datetime.toDateString() ===
                          new Date().toDateString();
                        return (
                          <button
                            onClick={() => {
                              setSlotIndex(index);
                              setSlotTime(item[0]?.time || "");
                            }}
                            key={index}
                            className={`flex-1 flex flex-col items-center py-2.5 px-1 rounded-xl transition-all duration-200 ${
                              slotIndex === index
                                ? "bg-primary text-white shadow-lg shadow-primary/25 scale-[1.02]"
                                : "bg-white text-gray-600 hover:bg-primary/5 border border-gray-100 hover:border-primary/20"
                            }`}
                          >
                            <span
                              className={`text-[10px] font-medium ${slotIndex === index ? "text-gray-400" : "text-gray-400"}`}
                            >
                              {isToday
                                ? "Today"
                                : item[0] &&
                                  daysOfWeek[item[0].datetime.getDay()]}
                            </span>
                            <span className="text-base font-bold mt-0.5">
                              {item[0] && item[0].datetime.getDate()}
                            </span>
                          </button>
                        );
                      })}
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Pick a time
                </p>
                <div className="grid grid-cols-4 gap-2 max-h-[130px] overflow-y-auto pr-1">
                  {docSlots.length > 0 &&
                    docSlots[slotIndex]?.map((item, index) => (
                      <button
                        onClick={() => setSlotTime(item.time)}
                        key={index}
                        className={`py-2 px-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                          item.time === slotTime
                            ? "bg-primary text-white shadow-md shadow-primary/25"
                            : "bg-white text-gray-600 hover:bg-primary/5 border border-gray-100 hover:border-primary/20"
                        }`}
                      >
                        {item.time.toLowerCase()}
                      </button>
                    ))}
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleBookAppointment}
                disabled={loading || !slotTime}
                className={`w-full py-3.5 rounded-2xl font-semibold transition-all duration-200 ${
                  loading || !slotTime
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Booking...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Confirm Booking
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
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                )}
              </button>

              {/* Trust Footer */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-5 text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Secure
                </span>
                <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Free cancellation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Doctors */}
        <div className="mt-12">
          <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500">Consultation</p>
            <p className="text-lg font-semibold text-gray-900">
              {currencySymbol}
              {docInfo.fees}
            </p>
          </div>
          <button
            onClick={handleBookAppointment}
            disabled={loading || !slotTime}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              loading || !slotTime
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white"
            }`}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default Appointment;
