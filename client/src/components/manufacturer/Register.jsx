import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaIndustry,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaLock,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Register_manu() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRegister(data) {
    setIsSubmitting(true);
    try {
      const formattedData = {
        Manufacturer_Name: data.Manufacturer_Name,
        Contact_No: data.Contact_No,
        Email_ID: data.Email_ID,
        password: data.password,
        Address: {
          Street: data.Street,
          District: data.District,
          State: data.State,
          Pincode: data.Pincode,
        },
      };
      const response = await axios.post(
        "http://localhost:6100/manufacturer-api/register_manufacturer",
        formattedData
      );
      
      alert(`Registration successful for ${response.data.Manufacturer_Name}`);
      localStorage.removeItem("manufacturer");
      navigate("/manufacturer-login");
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        `Registration failed: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <h3 className="text-center mb-4 d-flex align-items-center justify-content-center gap-2">
                  <FaIndustry /> Manufacturer Registration
                </h3>

                <form onSubmit={handleSubmit(handleRegister)}>
                  {/* Manufacturer Name */}
                  <div className="mb-3">
                    <label className="form-label d-flex align-items-center gap-2 small text-muted fw-bold">
                      <FaIndustry /> Manufacturer Name
                    </label>
                    <input
                      type="text"
                      {...register("Manufacturer_Name", {
                        required: "Manufacturer name is required",
                      })}
                      className={`form-control ${
                        errors.Manufacturer_Name ? "is-invalid" : ""
                      }`}
                      placeholder="Company name"
                    />
                    {errors.Manufacturer_Name && (
                      <div className="invalid-feedback">
                        {errors.Manufacturer_Name.message}
                      </div>
                    )}
                  </div>

                  {/* Address Fields */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label d-flex align-items-center gap-2 small text-muted fw-bold">
                        <FaMapMarkerAlt /> Street
                      </label>
                      <input
                        type="text"
                        {...register("Street", { required: "Street is required" })}
                        className={`form-control ${
                          errors.Street ? "is-invalid" : ""
                        }`}
                        placeholder="Street / Area"
                      />
                      {errors.Street && (
                        <div className="invalid-feedback">
                          {errors.Street.message}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label d-flex align-items-center gap-2 small text-muted fw-bold">
                        <FaMapMarkerAlt /> District
                      </label>
                      <input
                        type="text"
                        {...register("District", {
                          required: "District is required",
                        })}
                        className={`form-control ${
                          errors.District ? "is-invalid" : ""
                        }`}
                        placeholder="District"
                      />
                      {errors.District && (
                        <div className="invalid-feedback">
                          {errors.District.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label d-flex align-items-center gap-2 small text-muted fw-bold">
                        <FaMapMarkerAlt /> State
                      </label>
                      <input
                        type="text"
                        {...register("State", { required: "State is required" })}
                        className={`form-control ${
                          errors.State ? "is-invalid" : ""
                        }`}
                        placeholder="State"
                      />
                      {errors.State && (
                        <div className="invalid-feedback">
                          {errors.State.message}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label d-flex align-items-center gap-2 small text-muted fw-bold">
                        <FaMapMarkerAlt /> Pincode
                      </label>
                      <input
                        type="text"
                        {...register("Pincode", {
                          required: "Pincode is required",
                        })}
                        className={`form-control ${
                          errors.Pincode ? "is-invalid" : ""
                        }`}
                        placeholder="Pincode"
                      />
                      {errors.Pincode && (
                        <div className="invalid-feedback">
                          {errors.Pincode.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact, Email, Password */}
                  <div className="mb-3">
                    <label className="form-label d-flex align-items-center gap-2 small text-muted fw-bold">
                      <FaPhone /> Contact Number
                    </label>
                    <input
                      type="text"
                      {...register("Contact_No", {
                        required: "Contact number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Enter valid 10-digit number",
                        },
                      })}
                      className={`form-control ${
                        errors.Contact_No ? "is-invalid" : ""
                      }`}
                      placeholder="10-digit phone number"
                    />
                    {errors.Contact_No && (
                      <div className="invalid-feedback">
                        {errors.Contact_No.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label d-flex align-items-center gap-2 small text-muted fw-bold">
                      <FaEnvelope /> Email
                    </label>
                    <input
                      type="email"
                      {...register("Email_ID", { required: "Email is required" })}
                      className={`form-control ${
                        errors.Email_ID ? "is-invalid" : ""
                      }`}
                      placeholder="Email address"
                    />
                    {errors.Email_ID && (
                      <div className="invalid-feedback">
                        {errors.Email_ID.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label d-flex align-items-center gap-2 small text-muted fw-bold">
                      <FaLock /> Password
                    </label>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be 6+ chars",
                        },
                      })}
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Enter password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-dark w-100 py-2"
                  >
                    {isSubmitting ? "Registering..." : "Complete Registration"}
                  </button>

                  <div className="text-center mt-3 small">
                    Already registered?{" "}
                    <Link
  to="/manufacturer-login"
  onClick={() => localStorage.removeItem("manufacturer")}
  className="text-decoration-none fw-semibold"
>
  Login here
</Link>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register_manu;
