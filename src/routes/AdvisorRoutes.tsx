import { Route } from "react-router-dom";
import AdvisorLayout from "../layouts/AdvisorLayout";
import AdviserDashboard from "../pages/Advisor/Dashboard";
import AdviserSubmissions from "../pages/Advisor/AdviserSubmissions";
import ReviewSubmission from "../pages/Advisor/ReviewSubmission";
import AssignedStudents from "../pages/Advisor/AssignedStudents";

export const AdvisorRoutes = (
  <Route path="/advisor" element={<AdvisorLayout />}>
    <Route index element={<AdviserDashboard />} />
    <Route path="submissions" element={<AdviserSubmissions />} />
    <Route path="students" element={<AssignedStudents />} />
    <Route path="/advisor/submissions/:id" element={<ReviewSubmission />} />
  </Route>
);
