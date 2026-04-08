import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, Mail, Lock, ChevronDown } from 'lucide-react'
import ReCAPTCHA from "react-google-recaptcha"

export default function LoginPage() {

  const navigate = useNavigate()

  const SITE_KEY = "6LeV_nUsAAAAAIkOCLMniIf_ryp74aCDoz9Xy1ky"

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [isLoading, setIsLoading] = useState(false)
  const [captchaValue, setCaptchaValue] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!captchaValue) {
      alert("Please verify captcha first")
      return
    }

    setIsLoading(true)

    try {
      console.log("Sending login request...")

      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      console.log("Response status:", res.status)

      // 🔥 Read response safely
      const text = await res.text()

      let data
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error("Invalid response from server")
      }

      if (!res.ok) {
        throw new Error(data.message || "Login failed")
      }

      console.log("LOGIN SUCCESS:", data)

      // ✅ SAVE DATA
      localStorage.setItem("token", data.token)
      localStorage.setItem("email", data.email)
      localStorage.setItem("name", data.name)
      localStorage.setItem("role", data.role)

      // ✅ REDIRECT
      if (data.role === "ADMIN") {
        navigate("/admin/dashboard")
      } else {
        navigate("/student/dashboard")
      }

    } catch (err) {
      console.error("LOGIN ERROR:", err)
      alert(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

        <div className="text-center mb-6">
          <GraduationCap className="mx-auto h-10 w-10 text-blue-600" />
          <h1 className="text-2xl font-bold mt-2">Portfolio Portal</h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <label>Email</label>
            <div className="relative">
              <Mail className="absolute left-2 top-3 h-4 w-4" />
              <input
                type="email"
                className="w-full border p-2 pl-8 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label>Password</label>
            <div className="relative">
              <Lock className="absolute left-2 top-3 h-4 w-4" />
              <input
                type="password"
                className="w-full border p-2 pl-8 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label>Role</label>
            <div className="relative">
              <select
                className="w-full border p-2 rounded"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
              <ChevronDown className="absolute right-2 top-3 h-4 w-4" />
            </div>
          </div>

          {/* CAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={SITE_KEY}
              onChange={(value) => setCaptchaValue(value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 rounded mt-2"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

        </form>

      </div>
    </div>
  )
}