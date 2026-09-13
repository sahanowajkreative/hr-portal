import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees, saveEmployees } from "../data/employeeStorage";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    const term = search.toLowerCase().trim();
    return [employee.name, employee.email, employee.department, employee.position]
      .join(" ")
      .toLowerCase()
      .includes(term);
  });

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmed) return;

    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
    saveEmployees(updatedEmployees);
  };

  return (
    <div className="page-stack">
      <section className="page-heading-row">
        <div><p className="eyebrow">PEOPLE</p><h2>Employees</h2><p className="muted">Manage employee records from one central directory.</p></div>
        <Link to="/employees/add" className="primary-button">+ Add employee</Link>
      </section>

      <section className="panel">
        <div className="table-toolbar">
          <div><strong>{filteredEmployees.length}</strong> employee{filteredEmployees.length !== 1 ? "s" : ""}</div>
          <input className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, department..." />
        </div>

        {filteredEmployees.length === 0 ? <div className="empty-state">No employees match your search.</div> : (
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Employee</th><th>Department</th><th>Position</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td><div className="person-cell"><div className="avatar small">{employee.name.charAt(0)}</div><div><strong>{employee.name}</strong><span>{employee.email}</span></div></div></td>
                    <td>{employee.department}</td>
                    <td>{employee.position}</td>
                    <td><span className="status-badge approved">{employee.status}</span></td>
                    <td><div className="table-actions"><Link to={`/employees/${employee.id}`} className="action-link">View</Link><Link to={`/employees/${employee.id}/edit`} className="action-link">Edit</Link><button onClick={() => handleDelete(employee.id)} className="action-link danger">Delete</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Employees;
