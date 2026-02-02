import React from "react";

const TrustedSection = () => {
  const trustedLogos = [
    { id: 1, name: "MedCare" },
    { id: 2, name: "HealthFirst" },
    { id: 3, name: "CityHealth" },
    { id: 4, name: "WellCare" },
    { id: 5, name: "CarePlus" },
  ];

  const stats = [
    { value: "500+", label: "Healthcare Partners" },
    { value: "50K+", label: "Patients Served" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <section
      className="py-20 px-4 md:px-10 lg:px-20"
      aria-labelledby="trusted-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            id="trusted-heading"
            className="text-lg md:text-xl font-medium text-gray-600 tracking-wide"
          >
            Trusted by leading clinics and healthcare professionals
          </h2>
        </div>

        {/* Logo Grid */}
        <div
          className="flex flex-wrap justify-center items-center gap-10 md:gap-16 mb-20"
          role="list"
          aria-label="Partner organizations"
        >
          {trustedLogos.map((logo) => (
            <div
              key={logo.id}
              role="listitem"
              className="text-gray-400 font-semibold text-lg md:text-xl tracking-wide hover:text-gray-600 transition-colors duration-300"
            >
              {logo.name}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-500 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
