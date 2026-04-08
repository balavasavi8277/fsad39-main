import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import StudentLayout from './components/StudentLayout'
import AdminLayout from './components/AdminLayout'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentProjects from './pages/student/StudentProjects'
import StudentUpload from './pages/student/StudentUpload'
import StudentMilestones from './pages/student/StudentMilestones'
import StudentPortfolio from './pages/student/StudentPortfolio'
import StudentFeedback from './pages/student/StudentFeedback'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminStudents from './pages/admin/AdminStudents'
import AdminProjects from './pages/admin/AdminProjects'
import AdminMilestones from './pages/admin/AdminMilestones'
import AdminFeedback from './pages/admin/AdminFeedback'

export default function App() {
  console.log("[v0] App.jsx: rendering routes")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="projects" element={<StudentProjects />} />
          <Route path="upload" element={<StudentUpload />} />
          <Route path="milestones" element={<StudentMilestones />} />
          <Route path="portfolio" element={<StudentPortfolio />} />
          <Route path="feedback" element={<StudentFeedback />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="milestones" element={<AdminMilestones />} />
          <Route path="feedback" element={<AdminFeedback />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
