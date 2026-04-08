import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      const res = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: role
        })
      })

      if (!res.ok) {
        throw new Error("Registration failed")
      }

      alert("Registered successfully!")

      navigate("/login")

    } catch (err) {
      console.log(err)
      alert("Error: " + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md w-96">

        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

      </form>
    </div>
  )
}