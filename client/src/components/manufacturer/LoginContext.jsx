import axios from "axios";
import { createContext, useState } from "react";

export const ManufactureLoginContextObj = createContext();

function ManufactureLoginContext({ children }) {
  const [currentManufacturer, setCurrentManufacturer] = useState(null);

  async function handleLogin({ Manufacturer_Name, password }, navigate) {
    try {
      const response = await axios.get(
        `http://localhost:6100/manufacturer-api/manufacturer/name/${Manufacturer_Name}`
      );

      const manufacturer = response.data; // single manufacturer object

      if (!manufacturer) {
        alert("Manufacturer not found");
        return null;
      }

      if (manufacturer.password === password) {
        setCurrentManufacturer(manufacturer);
        localStorage.setItem("manufacturer", JSON.stringify(manufacturer));

        alert("✅ Login successful!");
        navigate(`/manufacturer-home/${manufacturer.Manufacturer_Name}`); // ✅ redirect to home page
        return manufacturer;
      } else {
        alert("❌ Incorrect password");
        return null;
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("⚠️ Login failed, please try again");
      return null;
    }
  }

  return (
    <ManufactureLoginContextObj.Provider
      value={{ handleLogin, currentManufacturer }}
    >
      {children}
    </ManufactureLoginContextObj.Provider>
  );
}

export default ManufactureLoginContext;
