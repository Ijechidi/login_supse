"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"
import { useCalendarStore } from "@/store/use-calendar-store"

interface Notification {
  id: string
  message: string
  type: "success" | "error" | "info"
  timestamp: number
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const originalShowNotification = useCalendarStore.getState().showNotification

    useCalendarStore.setState({
      showNotification: (message: string, type: "success" | "error" | "info") => {
        originalShowNotification(message, type)

        const newNotification: Notification = {
          id: Math.random().toString(36).slice(2),
          message,
          type,
          timestamp: Date.now(),
        }

        setNotifications((prev) => [...prev, newNotification])

        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id))
        }, 5000)
      },
    })
  }, [])

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type: Notification["type"]) => {
    const base = "h-5 w-5"
    switch (type) {
      case "success":
        return <CheckCircle className={`${base} text-green-600 dark:text-green-400`} />
      case "error":
        return <AlertCircle className={`${base} text-red-600 dark:text-red-400`} />
      case "info":
        return <Info className={`${base} text-blue-600 dark:text-blue-400`} />
    }
  }

  const getClassNames = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "border-green-300 dark:border-green-700 bg-muted"
      case "error":
        return "border-red-300 dark:border-red-700 bg-muted"
      case "info":
        return "border-blue-300 dark:border-blue-700 bg-muted"
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-[calc(100vw-2rem)] max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`rounded-lg border p-4 shadow-lg ${getClassNames(notification.type)}`}
          >
            <div className="flex items-start gap-3">
              {getIcon(notification.type)}
              <div className="flex-1">
                <p className="text-sm text-foreground">{notification.message}</p>
              </div>
              <button title="button" type="button"
                onClick={() => removeNotification(notification.id)}
                className="text-muted-foreground hover:text-foreground transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
