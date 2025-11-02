import { useForm } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import { ManufactureLoginContextObj } from "./LoginContext";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaIndustry } from "react-icons/fa";

function Login_manu() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleLogin } = useContext(ManufactureLoginContextObj);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Redirect if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("manufacturer");
  
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsed = JSON.parse(storedUser);
  
        // ✅ Only redirect if manufacturer has valid name and id
        if (parsed.Manufacturer_Name && parsed._id) {
          navigate(`/manufacturer-home/${parsed.Manufacturer_Name}`);
        } else {
          localStorage.removeItem("manufacturer");
        }
      } catch {
        localStorage.removeItem("manufacturer");
      }
    }
  }, [navigate]);
  

  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      await handleLogin(data, navigate);
    } catch (err) {
      console.error("Login error:", err);
      alert("⚠️ Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">
                  <FaIndustry className="me-2" /> Manufacturer Login
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  
                  {/* Manufacturer Name */}
                  <div className="mb-3">
                    <input
                      type="text"
                      {...register("Manufacturer_Name", { required: "Manufacturer Name required" })}
                      className={`form-control ${errors.Manufacturer_Name ? "is-invalid" : ""}`}
                      placeholder="Manufacturer Name"
                    />
                    {errors.Manufacturer_Name && (
                      <div className="invalid-feedback">{errors.Manufacturer_Name.message}</div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <input
                      type="password"
                      {...register("password", { required: "Password required" })}
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="Password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password.message}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-dark w-100"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Logging in...
                      </>
                    ) : (
                      <>
                        <FaSignInAlt className="me-2" /> Sign In
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login_manu;
