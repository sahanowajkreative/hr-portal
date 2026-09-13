import { useEffect, useState } from "react";
import { getLeaves, saveLeaves } from "../data/leaveStorage";

function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setLeaves(getLeaves().sort((a, b) => b.id - a.id));
  }, []);

  const updateStatus = (id, status) => {
    const updatedLeaves = leaves.map((leave) => leave.id === id ? { ...leave, status } : leave);
    setLeaves(updatedLeaves);
    saveLeaves(updatedLeaves);
  };

  const visibleLeaves = filter === "All" ? leaves : leaves.filter((leave) => leave.status === filter);
  const pendingCount = leaves.filter((leave) => leave.status === "Pending").length;

  return (
    <div className="page-stack">
      <section className="page-heading-row"><div><p className="eyebrow">LEAVE MANAGEMENT</p><h2>Leave requests</h2><p className="muted">Review and decide employee leave applications.</p></div><div className="summary-pill"><strong>{pendingCount}</strong><span>pending</span></div></section>
      <section className="panel">
        <div className="table-toolbar"><div className="filter-group">{["All", "Pending", "Approved", "Rejected"].map((item) => <button key={item} className={`filter-button ${filter === item ? "selected" : ""}`} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
        {visibleLeaves.length === 0 ? <div className="empty-state">No {filter.toLowerCase()} leave requests.</div> : (
          <div className="table-wrap"><table className="data-table"><thead><tr><th>Employee</th><th>Leave type</th><th>Dates</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead><tbody>{visibleLeaves.map((leave) => <tr key={leave.id}><td><div className="person-cell"><div className="avatar small">{leave.employeeName.charAt(0)}</div><strong>{leave.employeeName}</strong></div></td><td>{leave.leaveType}</td><td>{leave.fromDate}<br />to {leave.toDate}</td><td>{leave.reason}</td><td><StatusBadge status={leave.status} /></td><td>{leave.status === "Pending" ? <div className="table-actions"><button className="action-link approve" onClick={() => updateStatus(leave.id, "Approved")}>Approve</button><button className="action-link danger" onClick={() => updateStatus(leave.id, "Rejected")}>Reject</button></div> : <span className="muted">Completed</span>}</td></tr>)}</tbody></table></div>
        )}
      </section>
    </div>
  );
}

function StatusBadge({ status }) { return <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>; }

export default LeaveRequests;
