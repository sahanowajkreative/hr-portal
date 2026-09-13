import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const demoUsers = [
  {
    id: 1001,
    name: "HR Admin",
    email: "hr@hrportal.com",
    password: "admin123",
    department: "Human Resources",
    role: "hr"
  },
  {
    id: 1002,
    name: "John Doe",
    email: "employee@hrportal.com",
    password: "employee123",
    department: "IT",
    role: "employee"
  }
];

function getStoredUsers() {
  const storedUsers = localStorage.getItem("users");

  if (storedUsers) {
    try {
      return JSON.parse(storedUsers);
    } catch {
      localStorage.removeItem("users");
    }
  }

  localStorage.setItem("users", JSON.stringify(demoUsers));
  return demoUsers;
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (!savedUser) return null;

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("loggedInUser");
      return null;
    }
  });

  const login = (email, password, role) => {
    const users = getStoredUsers();
    const foundUser = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password &&
        item.role === role
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email, password, or role." };
    }

    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    setUser(foundUser);
    return { success: true, user: foundUser };
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const registerUser = (newUser) => {
    const users = getStoredUsers();
    const emailExists = users.some(
      (item) => item.email.toLowerCase() === newUser.email.toLowerCase()
    );

    if (emailExists) {
      return { success: false, message: "An account with this email already exists." };
    }

    const userToSave = { ...newUser, id: Date.now() };
    const updatedUsers = [...users, userToSave];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    return { success: true, user: userToSave };
  };

  const updateUser = (updatedUser) => {
    const users = getStoredUsers();
    const updatedUsers = users.map((item) =>
      item.id === updatedUser.id ? updatedUser : item
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
