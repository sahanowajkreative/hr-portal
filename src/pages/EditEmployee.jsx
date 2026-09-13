import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEmployees, saveEmployees } from "../data/employeeStorage";
import { EmployeeForm } from "./AddEmployee";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const employee = getEmployees().find((item) => item.id === Number(id));
    if (employee) setFormData(employee);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEmployees = getEmployees().map((employee) =>
      employee.id === Number(id) ? { ...formData, id: Number(id) } : employee
    );
    saveEmployees(updatedEmployees);
    alert("Employee updated successfully!");
    navigate(`/employees/${id}`);
  };

  if (!formData) {
    return <div className="empty-state"><h2>Employee not found</h2><Link to="/employees" className="text-link">Back to employees</Link></div>;
  }

  return <EmployeeForm title="Edit employee" subtitle="Update this employee's record." formData={formData} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Save changes" cancelPath={`/employees/${id}`} />;
}

export default EditEmployee;
