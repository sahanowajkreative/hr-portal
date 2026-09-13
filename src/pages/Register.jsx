import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "IT",
    role: "employee"
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const result = registerUser(formData);
    if (!result.success) {
      setError(result.message);
      return;
    }

    alert("Account created successfully. Please sign in.");
    navigate("/login");
  };

  return (
    <div className="auth-page single-auth">
      <div className="auth-panel">
        <div className="auth-card register-card">
          <div className="auth-card-heading">
            <div className="brand-mark">HR</div>
            <div>
              <p className="eyebrow">HR PORTAL</p>
              <h2>Create account</h2>
            </div>
          </div>
          <p className="muted">Register an employee account with basic personal details.</p>

          {error && <div className="alert error">{error}</div>}

          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group full-span">
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Minimum 6 characters" required />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select id="department" name="department" value={formData.department} onChange={handleChange}>
                <option>IT</option>
                <option>HR</option>
                <option>Finance</option>
                <option>Marketing</option>
                <option>Operations</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select id="role" name="role" value={formData.role} onChange={handleChange}>
                <option value="employee">Employee</option>
                <option value="hr">HR</option>
              </select>
            </div>

            <div className="full-span">
              <button className="primary-button full-width" type="submit">Create account</button>
            </div>
          </form>

          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
          <p className="security-note">Demo project only: passwords are stored in localStorage. A production app must use a secure backend and password hashing.</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
