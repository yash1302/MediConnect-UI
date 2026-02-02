import React, { useEffect } from "react";
import { assets } from "../assets/assets";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">
              About MediConnect
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Making Healthcare Accessible for Everyone
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              We're on a mission to simplify how people connect with healthcare
              professionals, one appointment at a time.
            </p>
          </div>

          {/* Change 1: Trust Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2 text-gray-500">
              <svg
                className="w-5 h-5 text-emerald-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">Verified Providers</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <svg
                className="w-5 h-5 text-amber-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <svg
                className="w-5 h-5 text-violet-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-sm font-medium">256-bit Encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="lg:w-5/12">
            <div className="relative">
              <img
                className="w-full rounded-2xl shadow-lg"
                src={assets.about_image}
                alt="Healthcare professionals"
              />
              {/* Trust badge overlay */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      HIPAA Compliant
                    </p>
                    <p className="text-xs text-gray-500">Your data is secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-7/12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Trusted Partner in Healthcare
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Welcome to MediConnect, your trusted partner in managing your
                healthcare needs conveniently and efficiently. We understand the
                challenges individuals face when it comes to scheduling doctor
                appointments and managing their health records.
              </p>
              <p>
                MediConnect is committed to excellence in healthcare technology.
                We continuously strive to enhance our platform, integrating the
                latest advancements to improve user experience and deliver
                superior service. Whether you're booking your first appointment
                or managing ongoing care, MediConnect is here to support you
                every step of the way.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  50K+
                </p>
                <p className="text-sm text-gray-500 mt-1">Patients Served</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  200+
                </p>
                <p className="text-sm text-gray-500 mt-1">Verified Doctors</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  98%
                </p>
                <p className="text-sm text-gray-500 mt-1">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change 2: Patient Testimonial - Social Proof */}
      <div className="bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <svg
              className="w-10 h-10 text-gray-200 mx-auto mb-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
              "MediConnect completely changed how I manage my family's
              healthcare. Booking appointments used to be such a hassle — now it
              takes seconds."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">SR</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Sarah Rodriguez</p>
                <p className="text-sm text-gray-500">
                  Mother of 3 · San Francisco, CA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-6">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our Vision
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our vision at MediConnect is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Why Choose MediConnect
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're built different. Here's what sets us apart from the rest.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Efficiency Card */}
          <div className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:border-transparent transition-all duration-300">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Efficiency
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Streamlined appointment scheduling that fits into your busy
              lifestyle. Book in under 2 minutes.
            </p>
          </div>

          {/* Convenience Card */}
          <div className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:border-transparent transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
              <svg
                className="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Convenience
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Access to a network of trusted healthcare professionals in your
              area. Available 24/7.
            </p>
          </div>

          {/* Personalization Card */}
          <div className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:border-transparent transition-all duration-300">
            <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-violet-100 transition-colors">
              <svg
                className="w-6 h-6 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Personalization
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Tailored recommendations and reminders to help you stay on top of
              your health journey.
            </p>
          </div>
        </div>
      </div>

      {/* Change 3: Leadership/Founder Message */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
            <div className="md:w-1/3 text-center md:text-left">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto md:mx-0 mb-4">
                <span className="text-4xl font-bold text-primary">JM</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Dr. James Mitchell
              </h3>
              <p className="text-sm text-gray-500">Founder & CEO</p>
            </div>
            <div className="md:w-2/3">
              <svg
                className="w-8 h-8 text-primary/20 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                "After 15 years in medicine, I saw firsthand how difficult it
                was for patients to navigate the healthcare system. I founded
                MediConnect to change that — to make booking a doctor as simple
                as ordering a coffee."
              </p>
              <p className="text-gray-500 text-sm">
                Previously Chief of Medicine at Stanford Health · Harvard
                Medical School '08
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Change 4: Partner/Media Logos for credibility */}
      <div className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider mb-6">
            Featured In & Trusted By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-50">
            <span className="text-xl font-bold text-gray-400">TechCrunch</span>
            <span className="text-xl font-bold text-gray-400">Forbes</span>
            <span className="text-xl font-bold text-gray-400">HealthTech</span>
            <span className="text-xl font-bold text-gray-400">WIRED</span>
            <span className="text-xl font-bold text-gray-400">Bloomberg</span>
          </div>
        </div>
      </div>

      {/* CTA Section - Enhanced with trust signals */}
      <div className="bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Ready to take control of your health?
              </h2>
              <p className="text-gray-400 mb-4">
                Join 50,000+ patients who trust MediConnect for their healthcare
                needs.
              </p>
              {/* Trust micro-copy */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-emerald-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Free to sign up
                </span>
                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-emerald-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-emerald-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Cancel anytime
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/doctors"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Find a Doctor
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
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors whitespace-nowrap"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
