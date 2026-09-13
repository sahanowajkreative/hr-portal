import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({ name: user.name || "", email: user.email || "", department: user.department || "", role: user.role || "employee" });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ ...user, name: formData.name.trim(), email: formData.email.trim(), department: formData.department });
    setSaved(true);
  };

  return (
    <div className="page-stack narrow-page">
      <section className="page-heading-row"><div><p className="eyebrow">ACCOUNT</p><h2>My profile</h2><p className="muted">Update the personal details shown in your portal.</p></div></section>
      <section className="panel profile-editor">
        <div className="profile-banner"><div className="avatar huge">{user.name.charAt(0)}</div><div><h3>{user.name}</h3><p>{user.role === "hr" ? "HR Administrator" : "Employee"}</p></div></div>
        {saved && <div className="alert success">Profile updated successfully.</div>}
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group"><label>Name</label><input name="name" value={formData.name} onChange={handleChange} required /></div>
          <div className="form-group"><label>Email</label><input name="email" type="email" value={formData.email} onChange={handleChange} required /></div>
          <div className="form-group"><label>Department</label><select name="department" value={formData.department} onChange={handleChange}><option>IT</option><option>HR</option><option>Finance</option><option>Marketing</option><option>Operations</option><option>Human Resources</option></select></div>
          <div className="form-group"><label>Role</label><input value={formData.role === "hr" ? "HR" : "Employee"} disabled /></div>
          <div className="form-actions full-span"><button type="submit" className="primary-button">Save profile</button></div>
        </form>
      </section>
    </div>
  );
}

export default Profile;
