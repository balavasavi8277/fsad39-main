import { DashboardNavbar } from '../../components/DashboardShell'
import { allProjects } from '../../data'
import { Link } from 'react-router-dom'

export default function AdminProjects() {
  return (
    <div className="flex flex-col">
      <DashboardNavbar title="Projects" name="Dr Sharma" />
      <div className="flex flex-col gap-6 p-4 lg:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Project Review</h2>
            <p className="mt-1 text-sm text-muted-foreground">Review and manage all student projects</p>
          </div>
          <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
            {allProjects.length} Projects
          </span>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Student Name</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Project</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Progress</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Milestone %</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {allProjects.map((project) => {
                  const statusColor =
                    project.status === 'Completed'
                      ? 'bg-success/10 text-success'
                      : project.status === 'In Progress'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-accent/10 text-accent'

                  return (
                    <tr key={project.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {project.student.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium text-card-foreground">{project.student}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">{project.title}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 overflow-hidden rounded-full bg-secondary">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-card-foreground">{project.milestone}%</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor}`}>{project.status}</span>
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          to="/admin/feedback"
                          className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
