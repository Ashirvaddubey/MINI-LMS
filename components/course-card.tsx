"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users, BookOpen } from "lucide-react"

interface CourseCardProps {
  id: string
  title: string
  summary: string
  instructor: string
  duration: string
  students: number
  lessons: number
  thumbnail?: string
}

export function CourseCard({ id, title, summary, instructor, duration, students, lessons }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col overflow-hidden group border-2 hover:border-primary/50 transition-all shadow-lg hover:shadow-xl">
        <div className="h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/50 via-secondary/40 to-accent/30"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
              <BookOpen className="h-16 w-16 text-primary/70" />
            </motion.div>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{title}</CardTitle>
          <CardDescription className="text-sm font-medium">by {instructor}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{summary}</p>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1.5 rounded-md">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">{duration}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1.5 rounded-md">
              <Users className="h-3.5 w-3.5 text-secondary" />
              <span className="font-medium">{students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1.5 rounded-md">
              <BookOpen className="h-3.5 w-3.5 text-accent" />
              <span className="font-medium">{lessons} lessons</span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button asChild className="w-full font-semibold shadow-md hover:shadow-lg transition-all" size="default">
            <Link href={`/courses/${id}`}>View Course</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
