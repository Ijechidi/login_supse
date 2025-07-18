"use client"

import React, {
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion"
import { Check, Loader2, SendHorizontal, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"

type ButtonStatus = "idle" | "loading" | "success" | "error"

interface SlideButtonProps extends Omit<ButtonProps, "children"> {
  onComplete?: () => void
  resetDelay?: number
  resolveTo?: "success" | "error"
  trackWidth?: number
  text?: string
  completedText?: string
}

const BUTTON_WIDTH = 48
const TRACK_WIDTH = 200
const DRAG_THRESHOLD = 0.85
const SPRING = { stiffness: 400, damping: 40 }

const useButtonStatus = (resolveTo: "success" | "error" = "success") => {
  const [status, setStatus] = useState<ButtonStatus>("idle")

  const handleSubmit = useCallback(() => {
    setStatus("loading")
    setTimeout(() => {
      setStatus(resolveTo)
    }, 1500)
  }, [resolveTo])

  const reset = useCallback(() => setStatus("idle"), [])

  return { status, handleSubmit, reset }
}

const StatusIcon: React.FC<{ status: ButtonStatus }> = ({ status }) => {
  const iconMap = useMemo(() => ({
    idle: <SendHorizontal className="h-4 w-4" />,
    loading: <Loader2 className="h-4 w-4 animate-spin" />,
    success: <Check className="h-4 w-4" />,
    error: <X className="h-4 w-4" />,
  }), [])

  return (
    <motion.div
      key={status}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      {iconMap[status]}
    </motion.div>
  )
}

const SlideButton = forwardRef<HTMLButtonElement, SlideButtonProps>(
  ({
    className,
    onComplete,
    resetDelay = 3000,
    resolveTo = "success",
    trackWidth = TRACK_WIDTH,
    text = "Slide to confirm",
    completedText = "Confirmed",
    ...props
  }, ref) => {
    const { status, handleSubmit, reset } = useButtonStatus(resolveTo)
    const [completed, setCompleted] = useState(false)

    const dragX = useMotionValue(0)
    const springX = useSpring(dragX, SPRING)
    const maxDrag = trackWidth - BUTTON_WIDTH
    const progress = useTransform(springX, [0, maxDrag], [0, 1])
    const backgroundWidth = useTransform(springX, [0, maxDrag], [0, maxDrag + 24])

    const handleDrag = useCallback(
      (_: any, info: PanInfo) => {
        if (completed) return
        const newX = Math.max(0, Math.min(info.offset.x, maxDrag))
        dragX.set(newX)
      },
      [completed, dragX, maxDrag]
    )

    const handleDragEnd = useCallback(() => {
      const currentProgress = progress.get()
      if (currentProgress >= DRAG_THRESHOLD && !completed) {
        setCompleted(true)
        dragX.set(maxDrag) // Force visuel à droite
        handleSubmit()
        onComplete?.()

        setTimeout(() => {
          setCompleted(false)
          reset()
          dragX.set(0)
        }, resetDelay)
      } else {
        dragX.set(0)
      }
    }, [completed, progress, handleSubmit, onComplete, resetDelay, reset, dragX, maxDrag])

    const getStatusColor = () => {
      switch (status) {
        case "success": return "bg-green-500 hover:bg-green-600 border-green-400"
        case "error": return "bg-red-500 hover:bg-red-600 border-red-400"
        case "loading": return "bg-blue-500 border-blue-400"
        default: return ""
      }
    }

    return (
      <div className="relative flex items-center">
        <motion.div
          style={{ width: trackWidth }}
          className="relative h-12 rounded-full border-2 border-border bg-background overflow-hidden shadow-sm transition-colors duration-200"
        >
          <motion.div
            style={{ width: backgroundWidth }}
            className="absolute left-0 top-0 h-full rounded-full bg-primary/10"
          />

          {/* Text */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={completed ? "completed" : "idle"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={cn(
                  "text-sm font-medium select-none truncate",
                  completed ? "text-primary" : "text-muted-foreground"
                )}
              >
                {completed ? completedText : text}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Glissable Button */}
          <motion.div
            drag={!completed ? "x" : false}
            dragConstraints={{ left: 0, right: maxDrag }}
            dragElastic={0.05}
            dragMomentum={false}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{ x: springX }}
            className={cn(
              "absolute top-[2px] left-1 z-10",
              completed && "cursor-default",
              !completed && "cursor-grab active:cursor-grabbing"
            )}
            whileDrag={{ scale: 1.05 }}
          >
            <Button
              ref={ref}
              size="icon"
              disabled={status === "loading"}
              {...props}
              className={cn(
                "h-10 w-10 rounded-full shadow-lg border-2 border-background",
                "hover:shadow-xl transition-all duration-200",
                getStatusColor(),
                className
              )}
            >
              <AnimatePresence mode="wait">
                <StatusIcon status={status} />
              </AnimatePresence>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    )
  }
)

SlideButton.displayName = "SlideButton"
export { SlideButton, type SlideButtonProps }
