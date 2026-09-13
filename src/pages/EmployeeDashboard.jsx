import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getLeaves } from "../data/leaveStorage";

function EmployeeDashboard() {
  const { user } = useAuth();
  const leaves = useMemo(() => getLeaves().filter((leave) => leave.employeeId === user.id), [user.id]);
  const pending = leaves.filter((leave) => leave.status === "Pending").length;
  const approved = leaves.filter((leave) => leave.status === "Approved").length;

  return (
    <div className="page-stack">
      <section className="hero-card employee-hero">
        <div>
          <p className="eyebrow">EMPLOYEE DASHBOARD</p>
          <h2>Welcome back, {user.name.split(" ")[0]}.</h2>
          <p>Access your profile and manage your leave requests from one place.</p>
        </div>
        <Link to="/apply-leave" className="primary-button">Apply for leave</Link>
      </section>

      <section className="stats-grid">
        <div className="stat-card"><span>Total requests</span><strong>{leaves.length}</strong><small>Your submitted leave requests</small></div>
        <div className="stat-card"><span>Pending</span><strong>{pending}</strong><small>Waiting for HR decision</small></div>
        <div className="stat-card"><span>Approved</span><strong>{approved}</strong><small>Approved leave requests</small></div>
        <div className="stat-card"><span>Department</span><strong className="compact-stat">{user.department || "—"}</strong><small>Your current department</small></div>
      </section>

      <section className="content-grid two-columns">
        <div className="panel">
          <div className="panel-heading"><div><p className="eyebrow">MY SERVICES</p><h3>HR services</h3></div></div>
          <div className="quick-actions">
            <Link to="/my-leaves" className="quick-action"><strong>My leave requests</strong><span>Check dates, reasons and approval status.</span></Link>
            <Link to="/apply-leave" className="quick-action"><strong>Apply for leave</strong><span>Submit a new leave request to HR.</span></Link>
            <Link to="/profile" className="quick-action"><strong>My profile</strong><span>Review and update your personal details.</span></Link>
          </div>
        </div>
        <div className="panel">
          <div className="panel-heading"><div><p className="eyebrow">LATEST REQUESTS</p><h3>Leave status</h3></div><Link to="/my-leaves" className="text-link">View all</Link></div>
          {leaves.length === 0 ? <div className="empty-state">No leave requests yet.</div> : (
            <div className="mini-list">
              {leaves.slice(-4).reverse().map((leave) => (
                <div className="mini-list-item" key={leave.id}>
                  <div className="date-chip"><span>{leave.fromDate.slice(8)}</span><small>{leave.fromDate.slice(5, 7)}</small></div>
                  <div><strong>{leave.leaveType}</strong><span>{leave.fromDate} to {leave.toDate}</span></div>
                  <StatusBadge status={leave.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function StatusBadge({ status }) {
  return <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>;
}

export default EmployeeDashboard;
