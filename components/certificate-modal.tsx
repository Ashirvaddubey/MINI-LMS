"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Award, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CertificateModalProps {
  isOpen: boolean
  onClose: () => void
  courseName: string
  studentName: string
  completionDate: string
  certificateHash: string
}

export function CertificateModal({
  isOpen,
  onClose,
  courseName,
  studentName,
  completionDate,
  certificateHash,
}: CertificateModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-2xl font-bold">Certificate of Completion</h2>
                <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Certificate Content */}
              <div className="p-8">
                <div className="border-4 border-primary/20 rounded-lg p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="flex justify-center"
                    >
                      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="h-12 w-12 text-primary" />
                      </div>
                    </motion.div>

                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider">This certifies that</p>
                      <h3 className="text-3xl font-bold mt-2">{studentName}</h3>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">has successfully completed</p>
                      <h4 className="text-xl font-semibold mt-2 text-primary">{courseName}</h4>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground">Completion Date: {completionDate}</p>
                      <p className="text-xs text-muted-foreground mt-2 font-mono">Certificate ID: {certificateHash}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
