import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { DashboardNavbar } from '../../components/DashboardShell'
import { adminStats, allStudents, allProjects } from '../../data'
import { Users, FolderKanban, AlertCircle } from 'lucide-react'

export default function AdminDashboard() {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: ""
  })

  // 🔐 Protect route + load user data
  useEffect(() => {

    const token = localStorage.getItem("token")
    const name = localStorage.getItem("name")
    const email = localStorage.getItem("email")
    const role = localStorage.getItem("role")

    // 🚫 Not logged in
    if (!token) {
      navigate("/login")
      return
    }

    // 🚫 Wrong role
    if (role !== "ADMIN") {
      navigate("/student/dashboard")
      return
    }

    setUser({
      name: name || "",
      email: email || "",
      role: role || ""
    })

  }, [navigate])

  return (
    <div className="flex flex-col">

      {/* 🔥 Dynamic Name Everywhere */}
      <DashboardNavbar title="Admin Dashboard" name={user.name} />

      <div className="flex flex-col gap-6 p-4 lg:p-8">

        {/* ✅ Admin Info */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <h2 className="text-lg font-semibold">
            Welcome, {user.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            Email: {user.email}
          </p>
          <p className="text-sm text-muted-foreground">
            Role: {user.role}
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total Students</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-3xl font-bold">
              {adminStats.totalStudents}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total Projects</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <FolderKanban className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-3xl font-bold">
              {adminStats.totalProjects}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Pending Reviews</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10 text-warning">
                <AlertCircle className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-3xl font-bold">
              {adminStats.pendingReviews}
            </p>
          </div>

        </div>

        {/* Recent Students */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex justify-between px-5 py-4 border-b">
            <h3 className="font-semibold">Recent Students</h3>
            <Link to="/admin/students" className="text-primary text-sm">
              View All
            </Link>
          </div>

          <table className="w-full">
            <tbody>
              {allStudents.slice(0, 5).map((student) => (
                <tr key={student.id} className="border-b">

                  <td className="px-5 py-3">{student.name}</td>
                  <td className="px-5 py-3">{student.email}</td>
                  <td className="px-5 py-3">{student.branch}</td>
                  <td className="px-5 py-3">{student.projects}</td>
                  <td className="px-5 py-3">{student.progress}%</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Projects */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex justify-between px-5 py-4 border-b">
            <h3 className="font-semibold">Recent Projects</h3>
            <Link to="/admin/projects" className="text-primary text-sm">
              View All
            </Link>
          </div>

          <table className="w-full">
            <tbody>
              {allProjects.slice(0, 5).map((project) => (
                <tr key={project.id} className="border-b">

                  <td className="px-5 py-3">{project.student}</td>
                  <td className="px-5 py-3">{project.title}</td>
                  <td className="px-5 py-3">{project.progress}%</td>
                  <td className="px-5 py-3">{project.status}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}