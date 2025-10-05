"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type UserRole = "learner" | "creator" | "admin"

interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Hydrate user from storage on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        let msg = "Login failed"
        try {
          const err = await res.json()
          msg = err?.error?.message || err?.error?.code || msg
        } catch {}
        throw new Error(msg)
      }
      const data = await res.json()
      const loggedInUser: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role as UserRole,
      }
      setUser(loggedInUser)
      localStorage.setItem("user", JSON.stringify(loggedInUser))
      localStorage.setItem("token", data.access_token)
      if (data.refresh_token) localStorage.setItem("refresh_token", data.refresh_token)
      // Redirect based on role
      if (loggedInUser.role === "admin") {
        router.push("/admin/review/courses")
      } else if (loggedInUser.role === "creator") {
        router.push("/creator/dashboard")
      } else {
        router.push("/courses")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role }),
      })
      if (!res.ok) {
        let msg = "Signup failed"
        try {
          const err = await res.json()
          msg = err?.error?.message || err?.error?.code || msg
        } catch {}
        throw new Error(msg)
      }
      const data = await res.json()
      const newUser: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role as UserRole,
      }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      localStorage.setItem("token", data.access_token)
      if (data.refresh_token) localStorage.setItem("refresh_token", data.refresh_token)
      if (newUser.role === "admin") {
        router.push("/admin/review/courses")
      } else if (newUser.role === "creator") {
        router.push("/creator/dashboard")
      } else {
        router.push("/courses")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
