import { DashboardNavbar } from '../../components/DashboardShell'
import { projects } from '../../data'
import { CheckCircle2, Clock, Circle } from 'lucide-react'

export default function AdminMilestones() {
  return (
    <div className="flex flex-col">
      <DashboardNavbar title="Milestones" name="Dr Sharma" />
      <div className="flex flex-col gap-6 p-4 lg:p-8">
        <div>
          <h2 className="text-xl font-bold text-foreground">All Milestones</h2>
          <p className="mt-1 text-sm text-muted-foreground">Monitor milestone progress across all student projects</p>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project) => {
            const completedCount = project.milestones.filter((m) => m.status === 'Completed').length
            const totalCount = project.milestones.length
            const completionPct = Math.round((completedCount / totalCount) * 100)

            return (
              <div key={project.id} className="rounded-xl border border-border bg-card shadow-sm">
                <div className="flex flex-col gap-2 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-card-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">Student: {project.student}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{completedCount}/{totalCount}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-bold text-primary">{completionPct}%</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-5 h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${completionPct}%` }} />
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {project.milestones.map((ms, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 rounded-lg p-3 ${
                          ms.status === 'Completed'
                            ? 'bg-success/5'
                            : ms.status === 'In Progress'
                              ? 'bg-warning/5'
                              : 'bg-muted/50'
                        }`}
                      >
                        {ms.status === 'Completed' ? (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                        ) : ms.status === 'In Progress' ? (
                          <Clock className="h-5 w-5 shrink-0 text-warning" />
                        ) : (
                          <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-card-foreground">{ms.name}</p>
                          <p
                            className={`text-xs font-medium ${
                              ms.status === 'Completed'
                                ? 'text-success'
                                : ms.status === 'In Progress'
                                  ? 'text-warning'
                                  : 'text-muted-foreground'
                            }`}
                          >
                            {ms.status}
                          </p>
                        </div>
                      </div>
                    ))}
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
