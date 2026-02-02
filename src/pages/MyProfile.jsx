import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { updateUserProfileData } from "../utils/Api.utils";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const { userData, setUserData, loadUserProfileData } = useContext(AppContext);

  const handleUpdateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image, image.name);

      const { data } = await updateUserProfileData(formData);
      if (data) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setImage(false);
    loadUserProfileData();
  };

  // Reusable display field component
  const DisplayField = ({ icon, iconBg, label, value }) => (
    <div className="flex items-center gap-3 py-3">
      <div
        className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm text-gray-900 mt-0.5 truncate">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );

  // Reusable form field component
  const FormField = ({ label, children }) => (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );

  const inputStyles =
    "w-full text-sm text-gray-900 bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";

  if (!userData) return null;

  // ==================== VIEW MODE ====================
  if (!isEdit) {
    return (
      <div className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-slate-50 to-white py-10">
        <div className="max-w-2xl mx-auto px-4">
          {/* Identity Card - Display First */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative">
              {/* Decorative header background */}
              <div className="h-24 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />

              {/* Profile Identity */}
              <div className="px-6 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
                  <img
                    className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                    src={userData.image}
                    alt={userData.name}
                  />
                  <div className="flex-1 pb-1">
                    <h1 className="text-2xl font-semibold text-gray-900">
                      {userData.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                        Patient
                      </span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">
                        {userData.email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEdit(true)}
                    className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary bg-gray-50 hover:bg-primary/5 rounded-xl transition-all"
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
                        strokeWidth={1.5}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* Information Sections */}
            <div className="border-t border-gray-100">
              {/* Contact Section */}
              <div className="px-6 py-5">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Contact Information
                </h2>
                <div className="divide-y divide-gray-50">
                  <DisplayField
                    icon={
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    }
                    iconBg="bg-blue-50"
                    label="Phone"
                    value={userData.phone}
                  />
                  <DisplayField
                    icon={
                      <svg
                        className="w-5 h-5 text-amber-500"
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
                    }
                    iconBg="bg-amber-50"
                    label="Address"
                    value={
                      userData.address?.line1 || userData.address?.line2
                        ? `${userData.address.line1}${userData.address.line2 ? `, ${userData.address.line2}` : ""}`
                        : null
                    }
                  />
                </div>
              </div>

              {/* Personal Details Section */}
              <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/30">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Personal Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-x-6">
                  <DisplayField
                    icon={
                      <svg
                        className="w-5 h-5 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    }
                    iconBg="bg-purple-50"
                    label="Gender"
                    value={
                      userData.gender !== "Not Selected"
                        ? userData.gender
                        : null
                    }
                  />
                  <DisplayField
                    icon={
                      <svg
                        className="w-5 h-5 text-pink-500"
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
                    iconBg="bg-pink-50"
                    label="Date of Birth"
                    value={userData.dob}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Footer */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
            <svg
              className="w-4 h-4 text-emerald-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Your information is secure and encrypted</span>
          </div>
        </div>
      </div>
    );
  }

  // ==================== EDIT MODE ====================
  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-slate-50 to-white py-10">
      <div className="max-w-2xl mx-auto px-4">
        {/* Edit Mode Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h1 className="text-xl font-semibold text-gray-900">
              Edit Profile
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-5">
            Update your personal information below
          </p>
        </div>

        {/* Edit Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-primary/20 overflow-hidden">
          {/* Avatar Section */}
          <div className="px-6 py-6 bg-gradient-to-r from-primary/5 to-transparent border-b border-gray-100">
            <div className="flex items-center gap-5">
              <label htmlFor="image" className="cursor-pointer group relative">
                <img
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt=""
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                  accept="image/*"
                />
              </label>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Profile Photo
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Click to upload a new photo
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="p-6 space-y-6">
            {/* Basic Info Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Basic Information
              </h3>
              <FormField label="Full Name">
                <input
                  className={inputStyles}
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  value={userData.name}
                  placeholder="Enter your full name"
                />
              </FormField>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <FormField label="Phone Number">
                  <input
                    className={inputStyles}
                    type="tel"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    value={userData.phone}
                    placeholder="Enter your phone number"
                  />
                </FormField>
                <FormField label="Address Line 1">
                  <input
                    className={inputStyles}
                    type="text"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={userData.address?.line1 || ""}
                    placeholder="Street address"
                  />
                </FormField>
                <FormField label="Address Line 2">
                  <input
                    className={inputStyles}
                    type="text"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={userData.address?.line2 || ""}
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                </FormField>
              </div>
            </div>

            {/* Personal Details Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Personal Details
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Gender">
                  <select
                    className={inputStyles}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    value={userData.gender}
                  >
                    <option value="Not Selected">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </FormField>
                <FormField label="Date of Birth">
                  <input
                    className={inputStyles}
                    type="date"
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, dob: e.target.value }))
                    }
                    value={userData.dob}
                  />
                </FormField>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateUserProfileData}
              className="px-6 py-2.5 text-sm font-medium bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Edit Mode Hint */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Press Escape or Cancel to discard changes
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
