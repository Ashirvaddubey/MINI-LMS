"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { mockCourses, mockEnrolledCourses } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressBar } from "@/components/progress-bar"
import { CertificateModal } from "@/components/certificate-modal"
import { Award, BookOpen, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ProgressPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)

  const enrolledCoursesWithDetails = mockEnrolledCourses.map((enrollment) => {
    const course = mockCourses.find((c) => c.id === enrollment.courseId)
    return { ...enrollment, ...course }
  })

  const completedCourses = enrolledCoursesWithDetails.filter((c) => c.completed)
  const inProgressCourses = enrolledCoursesWithDetails.filter((c) => !c.completed)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">My Learning Progress</h1>
            <p className="text-lg text-muted-foreground">Track your courses and celebrate your achievements</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockEnrolledCourses.length}</div>
                <p className="text-xs text-muted-foreground mt-1">{inProgressCourses.length} in progress</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{completedCourses.length}</div>
                <p className="text-xs text-muted-foreground mt-1">{completedCourses.length} certificates earned</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7 days</div>
                <p className="text-xs text-muted-foreground mt-1">Keep it up!</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* In Progress Courses */}
        {inProgressCourses.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inProgressCourses.map((course, index) => (
                <motion.div
                  key={course.courseId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                      <CardDescription>by {course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <ProgressBar progress={course.progress} />
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Last accessed {course.lastAccessed}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/courses/${course.courseId}`}>Continue Learning</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Completed Courses */}
        {completedCourses.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Completed Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedCourses.map((course, index) => (
                <motion.div
                  key={course.courseId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-success/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                          <CardDescription>by {course.instructor}</CardDescription>
                        </div>
                        <Award className="h-6 w-6 text-success flex-shrink-0 ml-2" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-success">
                        <div className="h-2 w-full bg-success/20 rounded-full">
                          <div className="h-full w-full bg-success rounded-full" />
                        </div>
                        <span className="font-medium whitespace-nowrap">100%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Completed on {course.completionDate}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => setSelectedCertificate(course)}
                      >
                        <Award className="h-4 w-4 mr-2" />
                        View Certificate
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal
          isOpen={!!selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
          courseName={selectedCertificate.title}
          studentName="John Doe"
          completionDate={selectedCertificate.completionDate}
          certificateHash={selectedCertificate.certificateHash}
        />
      )}
    </div>
  )
}
