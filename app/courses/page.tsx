"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CourseCard } from "@/components/course-card"
import { Search, Filter, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function CoursesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  useEffect(() => {
    if (!user) return
    ;(async () => {
      try {
        const res = await fetch("/api/learner/courses?limit=50")
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          throw new Error(err?.error?.message || err?.error?.code || "Failed to load courses")
        }
        const data = await res.json()
        setItems(data.items || [])
      } catch (e: any) {
        setError(e?.message || "Failed to load courses")
      } finally {
        setLoading(false)
      }
    })()
  }, [user])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-secondary/5">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Explore Courses
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Discover bite-sized courses designed to help you master new skills and advance your career.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto pt-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-12 h-14 text-base border-2 shadow-lg focus:shadow-xl transition-all"
              />
              <Button size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 font-semibold shadow-md">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">All Courses</h2>
            <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg border">
              <BookOpen className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">{items.length} courses</p>
            </div>
          </div>

          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : error ? (
            <p className="text-destructive">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((course: any, index: number) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CourseCard
                    id={course._id}
                    title={course.title}
                    summary={course.description || ""}
                    instructor={String(course.creatorId).slice(0, 8)}
                    duration={"—"}
                    students={0}
                    lessons={0}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </div>
  )
}
