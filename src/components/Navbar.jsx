import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="topbar">
      <div className="topbar-brand">
        <div className="brand-mark">HR</div>
        <div>
          <h1>HR Portal</h1>
          <span>People &amp; workforce management</span>
        </div>
      </div>

      {user && (
        <div className="topbar-user">
          <div className="avatar">{user.name?.charAt(0).toUpperCase()}</div>
          <div className="user-info">
            <strong>{user.name}</strong>
            <span>{user.role === "hr" ? "HR Administrator" : "Employee"}</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
