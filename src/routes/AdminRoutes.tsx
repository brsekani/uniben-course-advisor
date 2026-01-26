import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Student from "../pages/admin/Student";
import Advisers from "../pages/admin/Advisers";
import Courses from "../pages/admin/Courses";
import Submissions from "../pages/admin/Submissions";
import Settings from "../pages/admin/Settings";

export const AdminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="/admin/students" element={<Student />} />
    <Route path="/admin/advisers" element={<Advisers />} />
    <Route path="/admin/courses" element={<Courses />} />
    <Route path="/admin/submissions" element={<Submissions />} />
    <Route path="/admin/settings" element={<Settings />} />
  </Route>
);
