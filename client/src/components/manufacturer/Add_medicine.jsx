import React, { useState, useEffect } from "react";
import axios from "axios";

const Add_medicine = () => {
  const [manufacturer, setManufacturer] = useState(null);
  const [formData, setFormData] = useState({
    Medicine_Code: "",
    Medicine_Name: "",
    Type: "",
    Category: "",
    Quantity: "",
    Threshold_Qty: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("manufacturer");
  
    if (!storedData || storedData === "undefined") {
      console.warn("⚠️ No manufacturer data found in localStorage");
      alert("⚠️ Manufacturer not logged in!");
      window.location.href = "/manufacturer-login";
      return;
    }
  
    try {
      const parsed = JSON.parse(storedData);
      const manu = parsed.manufacturer ? parsed.manufacturer : parsed;
      setManufacturer(manu);
    } catch (error) {
      console.error("Error parsing manufacturer data:", error);
      localStorage.removeItem("manufacturer");
      alert("⚠️ Invalid session. Please log in again.");
      window.location.href = "/manufacturer-login";
    }
  }, []);
  
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!manufacturer?._id) {
      alert("Manufacturer ID not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:6100/medicine-api/medicine_add",
        {
          ...formData,
          Manufacturer_ID: manufacturer._id, // ✅ use _id from localStorage
        }
      );

      alert("✅ Medicine added successfully!");
      console.log(response.data);

      // Reset form
      setFormData({
        Medicine_Code: "",
        Medicine_Name: "",
        Type: "",
        Category: "",
        Quantity: "",
        Threshold_Qty: "",
      });
    } catch (error) {
      console.error("Error adding medicine:", error);
      alert("❌ Failed to add medicine");
    }
  };

  if (!manufacturer) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading manufacturer data...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Medicine</h2>

      <p className="text-center text-gray-600 mb-4">
        Logged in as <strong>{manufacturer.Manufacturer_Name}</strong> (ID:{" "}
        <span className="font-mono">{manufacturer._id}</span>)
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Medicine Code</label>
          <input
            type="text"
            name="Medicine_Code"
            value={formData.Medicine_Code}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Medicine Name</label>
          <input
            type="text"
            name="Medicine_Name"
            value={formData.Medicine_Name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <input
            type="text"
            name="Type"
            value={formData.Type}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
            placeholder="e.g., Tablet, Syrup"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
            placeholder="e.g., Antibiotic"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="Quantity"
            value={formData.Quantity}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Threshold Quantity
          </label>
          <input
            type="number"
            name="Threshold_Qty"
            value={formData.Threshold_Qty}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Add Medicine
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add_medicine;
