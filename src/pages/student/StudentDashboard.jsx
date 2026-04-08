import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardNavbar } from '../../components/DashboardShell'
import { Mail, FolderKanban, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export default function StudentDashboard() {

  const navigate = useNavigate()

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const email = localStorage.getItem("email")
  const name = localStorage.getItem("name") || "Student"
  const token = localStorage.getItem("token")

  // 🔐 Protect route + fetch projects
  useEffect(() => {

    if (!token) {
      navigate("/login")
      return
    }

    if (!email) return

    fetch(`http://localhost:8080/api/projects/${email}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch projects")
        return res.json()
      })
      .then(data => {
        setProjects(data)
      })
      .catch(err => {
        console.error(err)
        alert("Error loading projects")
      })
      .finally(() => {
        setLoading(false)
      })

  }, [email, token, navigate])

  // 📊 Dynamic stats
  const total = projects.length
  const completed = projects.filter(p => p.status === "Completed").length
  const inProgress = projects.filter(p => p.status === "In Progress").length
  const pending = projects.filter(p => p.status === "Pending").length

  return (
    <div className="flex flex-col">

      <DashboardNavbar title="Dashboard" name={name} />

      <div className="flex flex-col gap-6 p-4 lg:p-8">

        {/* Upload Button */}
        <button
          onClick={() => navigate("/student/upload")}
          className="bg-primary text-white px-4 py-2 rounded w-fit"
        >
          Upload Project
        </button>

        {/* Profile Card */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="h-16 w-16 flex items-center justify-center bg-primary text-white rounded-xl text-xl font-bold">
              {name.charAt(0)}
            </div>

            <div>
              <h2 className="text-xl font-bold">{name}</h2>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {email}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <StatCard label="Total Projects" value={total} icon={<FolderKanban />} />
          <StatCard label="Completed" value={completed} icon={<CheckCircle2 />} />
          <StatCard label="In Progress" value={inProgress} icon={<Clock />} />
          <StatCard label="Pending Review" value={pending} icon={<AlertCircle />} />

        </div>

        {/* Projects */}
        <div>
          <h3 className="text-lg font-semibold mb-4">My Projects</h3>

          {loading ? (
            <p>Loading...</p>
          ) : projects.length === 0 ? (
            <p>No projects uploaded yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

/* ---------- STAT CARD ---------- */

function StatCard({ label, value, icon }) {
  return (
    <div className="rounded-xl border p-5 shadow-sm">
      <div className="flex justify-between">
        <p className="text-sm text-gray-500">{label}</p>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

/* ---------- PROJECT CARD ---------- */

function ProjectCard({ project }) {

  const statusColor =
    project.status === "Completed"
      ? "text-green-600"
      : project.status === "In Progress"
        ? "text-yellow-600"
        : "text-blue-600"

  return (
    <div className="border rounded-xl p-4 shadow-sm">

      <h4 className="font-bold text-lg">{project.title}</h4>

      <p className="text-sm text-gray-600 mt-1">
        {project.description}
      </p>

      <p className="text-xs mt-2 text-gray-500">
        Tech: {project.tech}
      </p>

      <p className={`text-xs mt-2 ${statusColor}`}>
        Status: {project.status || "Pending"}
      </p>

      <div className="mt-2 text-xs text-blue-500">
        File: {project.fileName}
      </div>

    </div>
  )
}