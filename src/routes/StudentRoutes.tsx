import { Route } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import Student from "../pages/admin/Student";
import Advisers from "../pages/admin/Advisers";
import Courses from "../pages/admin/Courses";
import Submissions from "../pages/admin/Submissions";
import Settings from "../pages/admin/Settings";
import StudentLayout from "../layouts/StudentLayout";
import StudentDashboard from "../pages/students/Dashboard";
import AdvisingBuilder from "../pages/students/AdvisingBuilder";
import FinalCourseReview from "../pages/students/FinalReview";
import Results from "../pages/students/Results";
import SemesterResult from "../pages/students/SemesterResult";
import ProfilePage from "../pages/students/ProfilePage";

export const StudentRoutes = (
  <Route path="/student" element={<StudentLayout />}>
    <Route index element={<StudentDashboard />} />
    <Route path="/student/advising" element={<AdvisingBuilder />} />
    <Route path="/student/advising/review" element={<FinalCourseReview />} />
    <Route path="/student/results" element={<Results />} />
    <Route path="/student/results/:id" element={<SemesterResult />} />
    <Route path="/student/profile" element={<ProfilePage />} />
    <Route path="/student/settings" element={<Settings />} />
  </Route>
);
