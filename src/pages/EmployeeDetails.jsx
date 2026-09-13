import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEmployees } from "../data/employeeStorage";

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    setEmployee(getEmployees().find((item) => item.id === Number(id)) || null);
  }, [id]);

  if (!employee) {
    return <div className="empty-state"><h2>Employee not found</h2><Link to="/employees" className="text-link">Back to employees</Link></div>;
  }

  return (
    <div className="page-stack narrow-page">
      <section className="page-heading-row"><div><p className="eyebrow">EMPLOYEE PROFILE</p><h2>{employee.name}</h2><p className="muted">Employee ID #{employee.id}</p></div><div className="table-actions"><Link to={`/employees/${employee.id}/edit`} className="primary-button">Edit employee</Link><Link to="/employees" className="secondary-button">Back</Link></div></section>
      <section className="profile-card panel">
        <div className="profile-banner"><div className="avatar huge">{employee.name.charAt(0)}</div><div><h3>{employee.name}</h3><p>{employee.position}</p><span className="status-badge approved">{employee.status}</span></div></div>
        <div className="details-grid">
          <Detail label="Email" value={employee.email} /><Detail label="Department" value={employee.department} /><Detail label="Position" value={employee.position} /><Detail label="Phone" value={employee.phone} />
        </div>
      </section>
    </div>
  );
}

function Detail({ label, value }) { return <div className="detail-item"><span>{label}</span><strong>{value || "—"}</strong></div>; }

export default EmployeeDetails;
