import { DashboardNavbar } from '../../components/DashboardShell'
import { studentProfile, feedbackData } from '../../data'
import { MessageSquare, Calendar, User } from 'lucide-react'

export default function StudentFeedback() {
  return (
    <div className="flex flex-col">
      <DashboardNavbar title="Feedback" name={studentProfile.name} />
      <div className="flex flex-col gap-6 p-4 lg:p-8">
        <div>
          <h2 className="text-xl font-bold text-foreground">Admin Feedback</h2>
          <p className="mt-1 text-sm text-muted-foreground">Review feedback provided by your instructor on your projects</p>
        </div>

        <div className="flex flex-col gap-4">
          {feedbackData.map((fb) => (
            <div key={fb.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-card-foreground">{fb.project}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {fb.admin}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(fb.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-sm leading-relaxed text-card-foreground">{fb.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
