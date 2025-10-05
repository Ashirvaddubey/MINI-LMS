"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X, User } from "lucide-react"

interface CreatorApp {
  _id: string
  userId: string
  bio: string
  portfolioUrl?: string
  createdAt: string
}

export default function AdminReviewCreatorsPage() {
  const [items, setItems] = useState<CreatorApp[]>([])
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
        const res = await fetch("/api/admin/review/creators?limit=50", {
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

  const approve = async (id: string) => {
    const token = localStorage.getItem("token")
    if (!token) return alert("Please log in as admin")
    const res = await fetch(`/api/admin/review/creators/${id}/approve`, { method: "POST", headers: { Authorization: `Bearer ${token}` } })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return alert(data?.error?.message || data?.error?.code || "Failed to approve")
    }
    setItems((prev) => prev.filter((a) => a._id !== id))
  }

  const reject = async (id: string) => {
    const token = localStorage.getItem("token")
    if (!token) return alert("Please log in as admin")
    const res = await fetch(`/api/admin/review/creators/${id}/reject`, { method: "POST", headers: { Authorization: `Bearer ${token}` } })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return alert(data?.error?.message || data?.error?.code || "Failed to reject")
    }
    setItems((prev) => prev.filter((a) => a._id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Review Creator Applications</h1>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground">No pending applications</p>
        ) : (
          <div className="space-y-4">
            {items.map((app, i) => (
              <motion.div key={app._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>User: {app.userId}</span>
                          <span>•</span>
                          <span>{new Date(app.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="mt-2 text-sm">{app.bio}</p>
                        {app.portfolioUrl ? (
                          <p className="text-xs text-muted-foreground mt-1">Portfolio: {app.portfolioUrl}</p>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" className="border-success text-success bg-transparent" onClick={() => approve(app._id)}>
                          <Check className="h-4 w-4 mr-2" /> Approve
                        </Button>
                        <Button variant="outline" className="border-destructive text-destructive bg-transparent" onClick={() => reject(app._id)}>
                          <X className="h-4 w-4 mr-2" /> Reject
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
  )
}



