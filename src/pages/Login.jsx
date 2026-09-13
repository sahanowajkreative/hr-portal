import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const result = login(formData.email.trim(), formData.password, formData.role);

    if (!result.success) {
      setError(result.message);
      return;
    }

    const requestedPath = location.state?.from?.pathname;
    const fallback = result.user.role === "hr" ? "/dashboard" : "/employee-dashboard";
    navigate(requestedPath || fallback, { replace: true });
  };

  const fillDemo = (role) => {
    if (role === "hr") {
      setFormData({ email: "hr@hrportal.com", password: "admin123", role: "hr" });
    } else {
      setFormData({ email: "employee@hrportal.com", password: "employee123", role: "employee" });
    }
    setError("");
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-content">
          <div className="brand-mark large">HR</div>
          <p className="eyebrow">WELCOME TO</p>
          <h1>HR Portal</h1>
          <p>One simple place to manage employees, leave requests and HR services.</p>
          <div className="auth-features">
            <span>✓ Employee management</span>
            <span>✓ Leave management</span>
            <span>✓ Role-based access</span>
          </div>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-card">
          <p className="eyebrow">ACCOUNT ACCESS</p>
          <h2>Sign in</h2>
          <p className="muted">Use your HR Portal account to continue.</p>

          {error && <div className="alert error">{error}</div>}

          <form onSubmit={handleSubmit} className="form-stack">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
            </div>

            <div className="form-group">
              <label htmlFor="role">Login as</label>
              <select id="role" name="role" value={formData.role} onChange={handleChange}>
                <option value="employee">Employee</option>
                <option value="hr">HR</option>
              </select>
            </div>

            <button className="primary-button full-width" type="submit">Sign in</button>
          </form>

          <div className="demo-box">
            <strong>Quick demo login</strong>
            <div className="demo-buttons">
              <button type="button" className="secondary-button" onClick={() => fillDemo("employee")}>Employee demo</button>
              <button type="button" className="secondary-button" onClick={() => fillDemo("hr")}>HR demo</button>
            </div>
          </div>

          <p className="auth-switch">New employee? <Link to="/register">Create an account</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
