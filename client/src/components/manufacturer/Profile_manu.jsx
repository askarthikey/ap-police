import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile_manu = () => {
  const [manufacturer, setManufacturer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("manufacturer");

    if (!storedData || storedData === "undefined") {
      alert("⚠️ No manufacturer data found. Please log in again.");
      window.location.href = "/manufacturer-login";
      return;
    }

    try {
      const parsed = JSON.parse(storedData);
      const manu = parsed.manufacturer ? parsed.manufacturer : parsed;
      setManufacturer(manu);
      setFormData(manu);
    } catch (error) {
      console.error("Error parsing manufacturer data:", error);
      localStorage.removeItem("manufacturer");
      alert("⚠️ Invalid session. Please log in again.");
      window.location.href = "/manufacturer-login";
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested Address object fields
    if (name.startsWith("Address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        Address: { ...prev.Address, [addressField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle Save (PUT request)
  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:6100/manufacturer-api/manufacturer_update/${manufacturer._id}`,
        formData
      );

      alert("✅ Profile updated successfully!");

      // Update both state and localStorage
      setManufacturer(res.data);
      localStorage.setItem("manufacturer", JSON.stringify(res.data));

      setIsEditing(false);
    } catch (err) {
      console.error("Error updating manufacturer:", err);
      alert("❌ Failed to update profile.");
    }
  };

  if (!manufacturer) {
    return (
      <div className="text-center text-gray-500 mt-10">Loading profile...</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Manufacturer Profile
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-semibold">Name:</label>
          <input
            type="text"
            name="Manufacturer_Name"
            value={formData.Manufacturer_Name || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded p-1 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        <div>
          <label className="font-semibold">Email:</label>
          <input
            type="email"
            name="Email_ID"
            value={formData.Email_ID || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded p-1 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        <div>
          <label className="font-semibold">Contact No:</label>
          <input
            type="text"
            name="Contact_No"
            value={formData.Contact_No || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded p-1 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        <div>
          <label className="font-semibold">Manufacturer ID:</label>
          <input
            type="text"
            value={manufacturer.Manufacturer_ID}
            disabled
            className="w-full border rounded p-1 bg-gray-100"
          />
        </div>

        <div className="col-span-2 mt-2">
          <h3 className="font-semibold text-lg mb-2">Address</h3>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="Address.Street"
              placeholder="Street"
              value={formData.Address?.Street || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`border rounded p-1 ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            />
            <input
              type="text"
              name="Address.District"
              placeholder="District"
              value={formData.Address?.District || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`border rounded p-1 ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            />
            <input
              type="text"
              name="Address.State"
              placeholder="State"
              value={formData.Address?.State || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`border rounded p-1 ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            />
            <input
              type="text"
              name="Address.Pincode"
              placeholder="Pincode"
              value={formData.Address?.Pincode || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`border rounded p-1 ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-6 space-x-4">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setFormData(manufacturer);
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile_manu;