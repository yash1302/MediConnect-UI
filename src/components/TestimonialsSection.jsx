import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Patient",
      avatar: "SJ",
      color: "bg-blue-500",
      quote:
        "MediConnect has transformed how I manage my family's healthcare. Booking appointments is seamless and intuitive.",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "General Physician",
      avatar: "MC",
      color: "bg-green-500",
      quote:
        "This platform has streamlined my practice significantly. Patient communication has never been more efficient.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Clinic Administrator",
      avatar: "ER",
      color: "bg-purple-500",
      quote:
        "We've reduced no-shows by 40% since implementing MediConnect. The automated reminders are game-changing.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loved by healthcare teams
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Hear from patients and healthcare professionals who use MediConnect
            daily.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 hover:bg-white p-8 rounded-2xl border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Quote */}
              <div className="mb-6">
                <svg
                  className="w-10 h-10 text-primary/20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <blockquote className="mb-8">
                <p className="text-gray-700 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-semibold`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
