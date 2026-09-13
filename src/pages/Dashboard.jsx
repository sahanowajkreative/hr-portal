import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getEmployees } from "../data/employeeStorage";
import { getLeaves } from "../data/leaveStorage";

function Dashboard() {
  const { user } = useAuth();
  const employees = useMemo(() => getEmployees(), []);
  const leaves = useMemo(() => getLeaves(), []);
  const pendingLeaves = leaves.filter((leave) => leave.status === "Pending").length;

  return (
    <div className="page-stack">
      <section className="hero-card">
        <div>
          <p className="eyebrow">HR DASHBOARD</p>
          <h2>Good to see you, {user.name.split(" ")[0]}.</h2>
          <p>Keep employee records, leave approvals and onboarding moving smoothly.</p>
        </div>
        <Link to="/employees/add" className="primary-button">Add employee</Link>
      </section>

      <section className="stats-grid">
        <div className="stat-card"><span>Total employees</span><strong>{employees.length}</strong><small>Active employee records</small></div>
        <div className="stat-card"><span>Pending leaves</span><strong>{pendingLeaves}</strong><small>Requests waiting for review</small></div>
        <div className="stat-card"><span>Departments</span><strong>{new Set(employees.map((item) => item.department)).size}</strong><small>Across the organization</small></div>
        <div className="stat-card"><span>Portal role</span><strong>HR</strong><small>Full HR management access</small></div>
      </section>

      <section className="content-grid two-columns">
        <div className="panel">
          <div className="panel-heading"><div><p className="eyebrow">QUICK ACTIONS</p><h3>Common HR tasks</h3></div></div>
          <div className="quick-actions">
            <Link to="/employees" className="quick-action"><strong>Manage employees</strong><span>Search, view, edit and remove records.</span></Link>
            <Link to="/leaves" className="quick-action"><strong>Review leave requests</strong><span>Approve or reject pending requests.</span></Link>
            <Link to="/onboarding" className="quick-action"><strong>Onboarding</strong><span>Track new employee onboarding tasks.</span></Link>
          </div>
        </div>
        <div className="panel">
          <div className="panel-heading"><div><p className="eyebrow">RECENT EMPLOYEES</p><h3>Employee directory</h3></div><Link to="/employees" className="text-link">View all</Link></div>
          <div className="mini-list">
            {employees.slice(0, 4).map((employee) => (
              <Link to={`/employees/${employee.id}`} className="mini-list-item" key={employee.id}>
                <div className="avatar small">{employee.name.charAt(0)}</div>
                <div><strong>{employee.name}</strong><span>{employee.position} · {employee.department}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
