import { useMemo } from "react";
import { getEmployees } from "../data/employeeStorage";

function Onboarding() {
  const employees = useMemo(() => getEmployees(), []);

  const tasks = [
    { label: "Collect personal details", done: true },
    { label: "Create employee record", done: true },
    { label: "Verify documents", done: false },
    { label: "Complete orientation", done: false }
  ];

  return (
    <div className="page-stack">
      <section className="hero-card"><div><p className="eyebrow">HR OPERATIONS</p><h2>Onboarding</h2><p>Use this starter workflow to track the basic onboarding process for new employees.</p></div></section>
      <section className="content-grid two-columns">
        <div className="panel"><div className="panel-heading"><div><p className="eyebrow">CHECKLIST</p><h3>Onboarding steps</h3></div></div><div className="checklist">{tasks.map((task) => <div className="check-item" key={task.label}><span className={`check-circle ${task.done ? "done" : ""}`}>{task.done ? "✓" : ""}</span><span>{task.label}</span></div>)}</div></div>
        <div className="panel"><div className="panel-heading"><div><p className="eyebrow">DIRECTORY</p><h3>Current employees</h3></div></div><div className="mini-list">{employees.map((employee) => <div className="mini-list-item" key={employee.id}><div className="avatar small">{employee.name.charAt(0)}</div><div><strong>{employee.name}</strong><span>{employee.department} · {employee.position}</span></div></div>)}</div></div>
      </section>
    </div>
  );
}

export default Onboarding;
