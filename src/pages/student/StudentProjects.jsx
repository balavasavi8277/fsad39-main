import { useState, useEffect } from "react";
import { DashboardNavbar } from "../../components/DashboardShell";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function StudentProjects({ studentId, studentName }) {
  const [expandedId, setExpandedId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/auth/projects/${studentId}`);
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle multiple file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!files.length) return;

    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("title", title);
    formData.append("description", description);
    files.forEach((file) => formData.append("files", file));

    try {
      await axios.post("http://localhost:8080/api/auth/uploadProjects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFiles([]);
      setTitle("");
      setDescription("");
      fetchProjects(); // refresh list
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="flex flex-col">
      <DashboardNavbar title="My Projects" name={studentName} />

      {/* Upload Form */}
      <div className="p-4 lg:p-8 border rounded-lg mb-6 bg-card">
        <h2 className="text-xl font-bold mb-3">Upload Project</h2>
        <form onSubmit={handleUpload} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="textarea"
          />
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
            required
          />
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </form>
      </div>

      {/* Project List */}
      <div className="flex flex-col gap-6 p-4 lg:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">All Projects</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage and track your project progress
            </p>
          </div>
          <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
            {projects.length} Projects
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {projects.map((project) => {
            const isExpanded = expandedId === project.id;

            return (
              <div key={project.id} className="rounded-xl border border-border bg-card shadow-sm">
                <div className="p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-card-foreground">{project.title}</h3>
                      </div>
                      <p className="mt-1.5 text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <a
                      href={`http://localhost:8080/api/auth/files/${project.filePath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline"
                    >
                      Download
                    </a>
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    {isExpanded ? "Hide" : "View"} Milestones
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>

                {/* Milestones */}
                {isExpanded && project.milestones?.length > 0 && (
                  <div className="border-t border-border bg-secondary/30 px-5 py-4">
                    <h4 className="mb-3 text-sm font-semibold text-card-foreground">Milestone Tracker</h4>
                    <div className="flex flex-col gap-3">
                      {project.milestones.map((ms, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold bg-muted text-muted-foreground">
                            {idx + 1}
                          </div>
                          <div className="flex flex-1 items-center justify-between">
                            <span className="text-sm font-medium text-card-foreground">{ms.name}</span>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground`}>
                              {ms.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}