import { useState } from 'react'
import { DashboardNavbar } from '../../components/DashboardShell'
import { feedbackData, allProjects } from '../../data'
import { MessageSquare, Calendar, Send, CheckCircle2 } from 'lucide-react'

export default function AdminFeedback() {
  const [selectedProject, setSelectedProject] = useState('')
  const [feedbackText, setFeedbackText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSelectedProject('')
      setFeedbackText('')
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col">
      <DashboardNavbar title="Feedback" name="Dr Sharma" />
      <div className="flex flex-col gap-6 p-4 lg:p-8">
        {/* Submit Feedback Form */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-5 py-4">
            <h3 className="text-base font-semibold text-card-foreground">Submit Feedback</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">Write and submit feedback for a student project</p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-3 p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <p className="text-base font-semibold text-card-foreground">Feedback Submitted Successfully!</p>
              <p className="text-sm text-muted-foreground">The student will be notified of your feedback.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="project-select" className="text-sm font-medium text-card-foreground">Select Project</label>
                <select
                  id="project-select"
                  required
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="h-11 w-full appearance-none rounded-lg border border-input bg-background px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Choose a project...</option>
                  {allProjects.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.student} - {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="feedback-text" className="text-sm font-medium text-card-foreground">Feedback</label>
                <textarea
                  id="feedback-text"
                  required
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Write your feedback here..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary font-medium text-primary-foreground transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-auto sm:px-6"
              >
                <Send className="h-4 w-4" />
                Submit Feedback
              </button>
            </form>
          )}
        </div>

        {/* Previous Feedback */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Previous Feedback</h3>
          <div className="flex flex-col gap-4">
            {feedbackData.map((fb) => (
              <div key={fb.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <h4 className="text-base font-semibold text-card-foreground">{fb.project}</h4>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(fb.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <p className="text-sm leading-relaxed text-card-foreground">{fb.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
