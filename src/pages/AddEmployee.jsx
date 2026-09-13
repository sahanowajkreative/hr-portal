import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEmployees, saveEmployees } from "../data/employeeStorage";

const initialForm = { name: "", email: "", department: "IT", position: "", phone: "", status: "Active" };

function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employees = getEmployees();
    saveEmployees([...employees, { ...formData, id: Date.now() }]);
    alert("Employee added successfully!");
    navigate("/employees");
  };

  return <EmployeeForm title="Add employee" subtitle="Create a new employee record." formData={formData} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Save employee" cancelPath="/employees" />;
}

export function EmployeeForm({ title, subtitle, formData, onChange, onSubmit, submitLabel, cancelPath }) {
  return (
    <div className="page-stack narrow-page">
      <section className="page-heading-row"><div><p className="eyebrow">EMPLOYEE RECORD</p><h2>{title}</h2><p className="muted">{subtitle}</p></div><Link to={cancelPath} className="secondary-button">Cancel</Link></section>
      <form className="panel form-grid" onSubmit={onSubmit}>
        <div className="form-group"><label>Name</label><input name="name" value={formData.name} onChange={onChange} required /></div>
        <div className="form-group"><label>Email</label><input name="email" type="email" value={formData.email} onChange={onChange} required /></div>
        <div className="form-group"><label>Department</label><select name="department" value={formData.department} onChange={onChange}><option>IT</option><option>HR</option><option>Finance</option><option>Marketing</option><option>Operations</option></select></div>
        <div className="form-group"><label>Position</label><input name="position" value={formData.position} onChange={onChange} required /></div>
        <div className="form-group"><label>Phone</label><input name="phone" value={formData.phone} onChange={onChange} placeholder="9876543210" required /></div>
        <div className="form-group"><label>Status</label><select name="status" value={formData.status} onChange={onChange}><option>Active</option><option>Inactive</option></select></div>
        <div className="form-actions full-span"><Link to={cancelPath} className="secondary-button">Cancel</Link><button type="submit" className="primary-button">{submitLabel}</button></div>
      </form>
    </div>
  );
}

export default AddEmployee;
