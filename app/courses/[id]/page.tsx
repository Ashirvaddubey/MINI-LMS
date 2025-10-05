"use client"

import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { mockCourses } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users, BookOpen, Play, CheckCircle2, Circle } from "lucide-react"
import Link from "next/link"

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const course = mockCourses.find((c) => c.id === params.id)

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Course not found</h1>
          <Button onClick={() => router.push("/courses")}>Back to Courses</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Course Header */}
      <section className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="mb-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/courses")}>
                ← Back to Courses
              </Button>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold">{course.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{course.summary}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {course.instructor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">{course.instructor}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>

              <div className="pt-4">
                <Button size="lg" asChild>
                  <Link href={`/learn/${course.lessons_data[0].id}`}>
                    <Play className="h-5 w-5 mr-2" />
                    Start Learning
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {course.lessons} lessons • {course.duration} total length
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {course.lessons_data.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/learn/${lesson.id}`}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="flex-shrink-0">
                        {lesson.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {index + 1}. {lesson.title}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-sm text-muted-foreground">{lesson.duration}</div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
