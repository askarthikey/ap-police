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

    const manufacturer = response.data; // single object, not array

    if (!manufacturer) {
      alert("Manufacturer not found");
      return;
    }

    if (manufacturer.password === password) {
  setCurrentManufacturer(manufacturer);
  alert("Login successful!");
  navigate(`/manufacturer-home/${manufacturer.Manufacturer_Name}`);
} else {
  alert("Incorrect password");
}

  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed");
  }
}


  return (
    <ManufactureLoginContextObj.Provider value={{ handleLogin, currentManufacturer }}>
      {children}
    </ManufactureLoginContextObj.Provider>
  );
}

export default ManufactureLoginContext;
