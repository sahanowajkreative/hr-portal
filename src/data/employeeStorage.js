import employeesData from "./employees.json";

export const getEmployees = () => {
  const storedEmployees = localStorage.getItem("employees");

  if (storedEmployees) {
    try {
      return JSON.parse(storedEmployees);
    } catch {
      localStorage.removeItem("employees");
    }
  }

  localStorage.setItem("employees", JSON.stringify(employeesData));
  return employeesData;
};

export const saveEmployees = (employees) => {
  localStorage.setItem("employees", JSON.stringify(employees));
};
