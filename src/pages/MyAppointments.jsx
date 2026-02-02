import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { cancelAppointment, getUserAppointments } from "../utils/Api.utils";

const MyAppointments = () => {
  const { token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [cancellingId, setCancellingId] = useState(null);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const handleGetUserAppointments = async () => {
    try {
      const { data } = await getUserAppointments();
      setAppointments(data.reverse());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    setCancellingId(appointmentId);
    try {
      const { data } = await cancelAppointment(appointmentId);
      if (data) {
        toast.success(data.message);
        handleGetUserAppointments();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCancellingId(null);
    }
  };

  useEffect(() => {
    if (token) {
      handleGetUserAppointments();
    }
  }, [token]);

  // Group appointments by status
  const upcomingAppointments = appointments.filter(
    (apt) => !apt.cancelled && !apt.isCompleted,
  );
  const completedAppointments = appointments.filter(
    (apt) => apt.isCompleted && !apt.cancelled,
  );
  const cancelledAppointments = appointments.filter((apt) => apt.cancelled);

  // Status pill component
  const StatusPill = ({ status }) => {
    const styles = {
      upcoming: "bg-blue-50 text-blue-700 border-blue-100",
      completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
      cancelled: "bg-gray-100 text-gray-500 border-gray-200",
    };
    const labels = {
      upcoming: "Upcoming",
      completed: "Completed",
      cancelled: "Cancelled",
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  // Empty state component
  const EmptyState = ({ icon, title, subtitle }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );

  // Appointment card component
  const AppointmentCard = ({ appointment, status }) => {
    const isCancelling = cancellingId === appointment._id;

    return (
      <div
        className={`bg-white rounded-xl border ${status === "cancelled" ? "border-gray-200 opacity-60" : "border-gray-200"} p-4 hover:shadow-sm transition-shadow`}
      >
        <div className="flex gap-4">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <img
              className="w-14 h-14 rounded-xl object-cover bg-slate-100"
              src={appointment.docData.image}
              alt={appointment.docData.name}
            />
          </div>

          {/* Appointment Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {appointment.docData.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {appointment.docData.speciality}
                </p>
              </div>
              <StatusPill status={status} />
            </div>

            {/* Date, Time & Location */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-gray-400"
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
                <span>{slotDateFormat(appointment.slotDate)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-gray-400"
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
                <span>{appointment.slotTime}</span>
              </div>
              {appointment.docData.address?.line1 && (
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="truncate max-w-[180px]">
                    {appointment.docData.address.line1}
                  </span>
                </div>
              )}
            </div>

            {/* Action - Only for upcoming appointments */}
            {status === "upcoming" && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleCancelAppointment(appointment._id)}
                  disabled={isCancelling}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
                >
                  {isCancelling ? (
                    <>
                      <svg
                        className="w-3.5 h-3.5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Cancelling...
                    </>
                  ) : (
                    <>
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cancel Appointment
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Section component with scrollable content
  const Section = ({
    title,
    count,
    children,
    defaultOpen = true,
    statusColor,
  }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Section Header - Always visible */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50/50 hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
          <div className="flex items-center gap-2.5">
            <div className={`w-2 h-2 rounded-full ${statusColor}`} />
            <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {count}
            </span>
          </div>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Scrollable Content Area */}
        {isOpen && (
          <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
            <div className="p-3 space-y-3">{children}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-72px)] bg-gradient-to-b from-slate-50 to-white flex flex-col">
      {/* Fixed Header */}
      <div className="flex-shrink-0 px-4 pt-6 pb-4 max-w-3xl mx-auto w-full">
        <h1 className="text-xl font-semibold text-gray-900">My Appointments</h1>
        <p className="text-sm text-gray-500 mt-1">
          View and manage your scheduled appointments
        </p>
      </div>

      {/* Scrollable Middle Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="max-w-3xl mx-auto">
          {/* Appointments Sections */}
          {appointments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <EmptyState
                icon={
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
                title="No appointments yet"
                subtitle="Book your first appointment to get started"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Upcoming Appointments */}
              {upcomingAppointments.length > 0 && (
                <Section
                  title="Upcoming"
                  count={upcomingAppointments.length}
                  defaultOpen={true}
                  statusColor="bg-blue-500"
                >
                  {upcomingAppointments.map((apt) => (
                    <AppointmentCard
                      key={apt._id}
                      appointment={apt}
                      status="upcoming"
                    />
                  ))}
                </Section>
              )}

              {/* Completed Appointments */}
              {completedAppointments.length > 0 && (
                <Section
                  title="Completed"
                  count={completedAppointments.length}
                  defaultOpen={false}
                  statusColor="bg-emerald-500"
                >
                  {completedAppointments.map((apt) => (
                    <AppointmentCard
                      key={apt._id}
                      appointment={apt}
                      status="completed"
                    />
                  ))}
                </Section>
              )}

              {/* Cancelled Appointments */}
              {cancelledAppointments.length > 0 && (
                <Section
                  title="Cancelled"
                  count={cancelledAppointments.length}
                  defaultOpen={false}
                  statusColor="bg-gray-400"
                >
                  {cancelledAppointments.map((apt) => (
                    <AppointmentCard
                      key={apt._id}
                      appointment={apt}
                      status="cancelled"
                    />
                  ))}
                </Section>
              )}

              {/* Edge case: All sections empty after filtering */}
              {upcomingAppointments.length === 0 &&
                completedAppointments.length === 0 &&
                cancelledAppointments.length === 0 && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-8">
                    <EmptyState
                      icon={
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      }
                      title="No appointments found"
                      subtitle="Your appointment history will appear here"
                    />
                  </div>
                )}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Summary Footer */}
      {appointments.length > 0 && (
        <div className="flex-shrink-0 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span>{upcomingAppointments.length} upcoming</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{completedAppointments.length} completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-400" />
                <span>{cancelledAppointments.length} cancelled</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default MyAppointments;
