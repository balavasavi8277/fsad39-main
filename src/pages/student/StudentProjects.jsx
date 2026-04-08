import { useState } from 'react'
import { DashboardNavbar } from '../../components/DashboardShell'
import { studentProfile, projects } from '../../data'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function StudentProjects() {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <div className="flex flex-col">
      <DashboardNavbar title="My Projects" name={studentProfile.name} />
      <div className="flex flex-col gap-6 p-4 lg:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">All Projects</h2>
            <p className="mt-1 text-sm text-muted-foreground">Manage and track your project progress</p>
          </div>
          <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
            {projects.length} Projects
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {projects.map((project) => {
            const isExpanded = expandedId === project.id
            const statusColor =
              project.status === 'Completed'
                ? 'bg-success/10 text-success'
                : project.status === 'In Progress'
                  ? 'bg-warning/10 text-warning'
                  : 'bg-accent/10 text-accent'

            return (
              <div key={project.id} className="rounded-xl border border-border bg-card shadow-sm">
                <div className="p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-card-foreground">{project.title}</h3>
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor}`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <span className="shrink-0 text-2xl font-bold text-primary">{project.progress}%</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span className="font-medium text-card-foreground">{project.progress}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    {isExpanded ? 'Hide' : 'View'} Milestones
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="border-t border-border bg-secondary/30 px-5 py-4">
                    <h4 className="mb-3 text-sm font-semibold text-card-foreground">Milestone Tracker</h4>
                    <div className="flex flex-col gap-3">
                      {project.milestones.map((ms, idx) => {
                        const msColor =
                          ms.status === 'Completed'
                            ? 'bg-success text-success-foreground'
                            : ms.status === 'In Progress'
                              ? 'bg-warning text-warning-foreground'
                              : 'bg-muted text-muted-foreground'
                        return (
                          <div key={idx} className="flex items-center gap-3">
                            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${msColor}`}>
                              {idx + 1}
                            </div>
                            <div className="flex flex-1 items-center justify-between">
                              <span className="text-sm font-medium text-card-foreground">{ms.name}</span>
                              <span
                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                  ms.status === 'Completed'
                                    ? 'bg-success/10 text-success'
                                    : ms.status === 'In Progress'
                                      ? 'bg-warning/10 text-warning'
                                      : 'bg-muted text-muted-foreground'
                                }`}
                              >
                                {ms.status}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
