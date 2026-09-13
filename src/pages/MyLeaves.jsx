import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getLeaves } from "../data/leaveStorage";

function MyLeaves() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const myLeaves = getLeaves().filter((leave) => leave.employeeId === user.id);
    setLeaves(myLeaves.sort((a, b) => b.id - a.id));
  }, [user.id]);

  return (
    <div className="page-stack">
      <section className="page-heading-row"><div><p className="eyebrow">LEAVE SERVICE</p><h2>My leave requests</h2><p className="muted">Track your submitted requests and HR decisions.</p></div><Link to="/apply-leave" className="primary-button">+ Apply for leave</Link></section>
      <section className="panel">
        {leaves.length === 0 ? <div className="empty-state"><h3>No leave requests yet</h3><p>Submit your first leave request to see it here.</p><Link to="/apply-leave" className="primary-button">Apply for leave</Link></div> : (
          <div className="table-wrap"><table className="data-table"><thead><tr><th>Leave type</th><th>From</th><th>To</th><th>Reason</th><th>Applied on</th><th>Status</th></tr></thead><tbody>{leaves.map((leave) => <tr key={leave.id}><td><strong>{leave.leaveType}</strong></td><td>{leave.fromDate}</td><td>{leave.toDate}</td><td>{leave.reason}</td><td>{leave.appliedOn}</td><td><StatusBadge status={leave.status} /></td></tr>)}</tbody></table></div>
        )}
      </section>
    </div>
  );
}

function StatusBadge({ status }) { return <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>; }

export default MyLeaves;
