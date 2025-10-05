"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X, BookOpen, Calendar, User } from "lucide-react"

interface ReviewCourse {
  _id: string
  title: string
  description: string
  createdAt: string
  creatorId: string
}

export default function AdminReviewPage() {
  const [items, setItems] = useState<ReviewCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setError("Please log in as admin")
      setLoading(false)
      return
    }
    ;(async () => {
      try {
        const res = await fetch("/api/admin/review/courses?limit=50", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          throw new Error(err?.error?.message || err?.error?.code || "Failed to load")
        }
        const data = await res.json()
        setItems(data.items || [])
      } catch (e: any) {
        setError(e?.message || "Failed to load")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleApprove = async (courseId: string) => {
    const token = localStorage.getItem("token")
    if (!token) return alert("Please log in as admin")
    const res = await fetch(`/api/admin/review/courses/${courseId}/approve`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return alert(data?.error?.message || data?.error?.code || "Failed to approve")
    }
    setItems((prev) => prev.filter((c) => c._id !== courseId))
  }

  const handleReject = async (courseId: string) => {
    const token = localStorage.getItem("token")
    if (!token) return alert("Please log in as admin")
    const res = await fetch(`/api/admin/review/courses/${courseId}/reject`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return alert(data?.error?.message || data?.error?.code || "Failed to reject")
    }
    setItems((prev) => prev.filter((c) => c._id !== courseId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Review Panel</h1>
          <p className="text-muted-foreground">Review and approve pending course submissions</p>
          <div className="mt-4 flex gap-2 text-sm">
            <a href="/admin/review/courses" className="px-3 py-1 rounded border bg-primary/10 text-primary">Courses</a>
            <a href="/admin/review/creators" className="px-3 py-1 rounded border bg-transparent hover:bg-muted">Creators</a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-3xl font-bold mt-1">{items.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved Today</p>
                  <p className="text-3xl font-bold mt-1">5</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Check className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected Today</p>
                  <p className="text-3xl font-bold mt-1">2</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Courses */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Pending Courses</h2>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : error ? (
            <p className="text-destructive">{error}</p>
          ) : (
            <div className="space-y-4">
            {items.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{String(course.creatorId)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Submitted {new Date(course.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>Pending publish</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-success text-success hover:bg-success hover:text-white bg-transparent"
                          onClick={() => handleApprove(course._id)}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-destructive text-destructive hover:bg-destructive hover:text-white bg-transparent"
                          onClick={() => handleReject(course._id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
