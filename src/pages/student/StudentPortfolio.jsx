import { DashboardNavbar } from '../../components/DashboardShell'
import { studentProfile, projects } from '../../data'
import { ExternalLink } from 'lucide-react'

export default function StudentPortfolio() {
  return (
    <div className="flex flex-col">
      <DashboardNavbar title="Portfolio" name={studentProfile.name} />
      <div className="flex flex-col gap-6 p-4 lg:p-8">
        {/* Portfolio Header */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
              {studentProfile.avatar}
            </div>
            <h2 className="mt-4 text-2xl font-bold text-card-foreground">{studentProfile.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {studentProfile.branch} | {studentProfile.college}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">{studentProfile.email}</p>
            <div className="mt-4 flex gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {projects.length} Projects
              </span>
              <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                {projects.filter((p) => p.status === 'Completed').length} Completed
              </span>
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => {
            const statusColor =
              project.status === 'Completed'
                ? 'bg-success/10 text-success'
                : project.status === 'In Progress'
                  ? 'bg-warning/10 text-warning'
                  : 'bg-accent/10 text-accent'

            return (
              <div
                key={project.id}
                className="group flex flex-col rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="h-1.5 rounded-t-xl bg-primary" />
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="text-base font-semibold text-card-foreground">{project.title}</h3>
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor}`}>{project.status}</span>
                      <span className="text-sm font-semibold text-card-foreground">{project.progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
