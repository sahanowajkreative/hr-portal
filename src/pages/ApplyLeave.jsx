import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getLeaves, saveLeaves } from "../data/leaveStorage";

function ApplyLeave() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ leaveType: "Casual Leave", fromDate: "", toDate: "", reason: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.toDate < formData.fromDate) {
      setError("To date cannot be earlier than the from date.");
      return;
    }

    const newLeave = {
      id: Date.now(),
      employeeId: user.id,
      employeeName: user.name,
      leaveType: formData.leaveType,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      reason: formData.reason.trim(),
      status: "Pending",
      appliedOn: new Date().toISOString().split("T")[0]
    };

    saveLeaves([...getLeaves(), newLeave]);
    alert("Leave request submitted successfully!");
    navigate("/my-leaves");
  };

  return (
    <div className="page-stack narrow-page">
      <section className="page-heading-row"><div><p className="eyebrow">LEAVE SERVICE</p><h2>Apply for leave</h2><p className="muted">Submit a request for HR to review.</p></div><Link to="/my-leaves" className="secondary-button">My leaves</Link></section>
      <form className="panel form-grid" onSubmit={handleSubmit}>
        {error && <div className="alert error full-span">{error}</div>}
        <div className="form-group"><label>Leave type</label><select name="leaveType" value={formData.leaveType} onChange={handleChange}><option>Casual Leave</option><option>Sick Leave</option><option>Annual Leave</option><option>Emergency Leave</option></select></div>
        <div className="form-group"><label>From date</label><input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required /></div>
        <div className="form-group"><label>To date</label><input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required /></div>
        <div className="form-group full-span"><label>Reason</label><textarea name="reason" value={formData.reason} onChange={handleChange} placeholder="Explain briefly why you need leave." rows="5" required /></div>
        <div className="form-actions full-span"><Link to="/my-leaves" className="secondary-button">Cancel</Link><button type="submit" className="primary-button">Submit request</button></div>
      </form>
    </div>
  );
}

export default ApplyLeave;
