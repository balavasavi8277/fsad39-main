import { DashboardNavbar } from '../../components/DashboardShell'
import { studentProfile, projects } from '../../data'
import { CheckCircle2, Clock, Circle } from 'lucide-react'

export default function StudentMilestones() {
  return (
    <div className="flex flex-col">
      <DashboardNavbar title="Milestones" name={studentProfile.name} />
      <div className="flex flex-col gap-6 p-4 lg:p-8">
        <div>
          <h2 className="text-xl font-bold text-foreground">Project Milestones</h2>
          <p className="mt-1 text-sm text-muted-foreground">Track the progress of each project milestone</p>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project) => {
            const completedCount = project.milestones.filter((m) => m.status === 'Completed').length
            const totalCount = project.milestones.length
            const completionPct = Math.round((completedCount / totalCount) * 100)

            const statusColor =
              project.status === 'Completed'
                ? 'bg-success/10 text-success'
                : project.status === 'In Progress'
                  ? 'bg-warning/10 text-warning'
                  : 'bg-accent/10 text-accent'

            return (
              <div key={project.id} className="rounded-xl border border-border bg-card shadow-sm">
                <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-card-foreground">{project.title}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor}`}>{project.status}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{completedCount}/{totalCount} milestones</span>
                    <span className="text-lg font-bold text-primary">{completionPct}%</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-6">
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${completionPct}%` }} />
                    </div>
                  </div>

                  <div className="relative">
                    {project.milestones.map((ms, idx) => {
                      const isLast = idx === project.milestones.length - 1
                      return (
                        <div key={idx} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            {ms.status === 'Completed' ? (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-success-foreground">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                            ) : ms.status === 'In Progress' ? (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning text-warning-foreground">
                                <Clock className="h-4 w-4" />
                              </div>
                            ) : (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                <Circle className="h-4 w-4" />
                              </div>
                            )}
                            {!isLast && <div className="h-8 w-0.5 bg-border" />}
                          </div>

                          <div className={`pb-4 ${isLast ? 'pb-0' : ''}`}>
                            <p className="text-sm font-semibold text-card-foreground">{ms.name}</p>
                            <span
                              className={`mt-0.5 inline-block text-xs font-medium ${
                                ms.status === 'Completed'
                                  ? 'text-success'
                                  : ms.status === 'In Progress'
                                    ? 'text-warning'
                                    : 'text-muted-foreground'
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
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
