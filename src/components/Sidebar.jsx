import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  const menuItems =
    user?.role === "hr"
      ? [
          { name: "Dashboard", path: "/dashboard", icon: "▦" },
          { name: "Employees", path: "/employees", icon: "◉" },
          { name: "Leave Requests", path: "/leaves", icon: "▤" },
          { name: "Onboarding", path: "/onboarding", icon: "✓" },
          { name: "Profile", path: "/profile", icon: "●" }
        ]
      : [
          { name: "Dashboard", path: "/employee-dashboard", icon: "▦" },
          { name: "My Leaves", path: "/my-leaves", icon: "▤" },
          { name: "Apply Leave", path: "/apply-leave", icon: "+" },
          { name: "Profile", path: "/profile", icon: "●" }
        ];

  return (
    <aside className="sidebar">
      <div className="sidebar-section-label">MENU</div>
      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active-link" : ""}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-tip">
          <strong>HR Portal</strong>
          <span>Manage people, leave and HR services.</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
