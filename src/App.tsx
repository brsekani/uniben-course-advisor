import { Routes } from "react-router-dom";
import { AdminRoutes } from "./routes/AdminRoutes";
import { AdvisorRoutes } from "./routes/AdvisorRoutes";
import { StudentRoutes } from "./routes/StudentRoutes";

type UserRole = "admin" | "advisor" | "student";

export default function App() {
  const role: UserRole = "admin"; // "student" | "advisor" | "admin"

  return (
    <Routes>
      {role === "student" && StudentRoutes}
      {role === "advisor" && AdvisorRoutes}
      {role === "admin" && AdminRoutes}
    </Routes>
  );
}
