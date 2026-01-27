import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import { AdminRoutes } from "./routes/AdminRoutes";
import { AdvisorRoutes } from "./routes/AdvisorRoutes";
import { StudentRoutes } from "./routes/StudentRoutes";

export type UserRole = "admin" | "advisor" | "student" | null;

export default function App() {
  const [role, setRole] = useState<UserRole>(
    () => (localStorage.getItem("role") as UserRole) ?? null,
  );

  return (
    <Routes>
      <Route path="/" element={<Login setRole={setRole} />} />

      {role === "student" && StudentRoutes}
      {role === "advisor" && AdvisorRoutes}
      {role === "admin" && AdminRoutes}
    </Routes>
  );
}
