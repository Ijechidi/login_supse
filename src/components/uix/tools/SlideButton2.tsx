"use client"

import React, { forwardRef, useCallback, useState, useMemo } from "react"
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

const DRAG_CONSTRAINTS = { left: 0, right: 155 }
const DRAG_THRESHOLD = 0.9

const BUTTON_STATES = {
  initial: { width: "12rem" },
  completed: { width: "8rem" },
}

const ANIMATION_CONFIG = {
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 0.8,
  },
}

interface SlideButtonProps extends Omit<ButtonProps, "children"> {
  onComplete?: () => void
  resetDelay?: number
  resolveTo?: "success" | "error"
  text?: string
  completedText?: string
}

const StatusIcon: React.FC<{ status: ButtonStatus }> = ({ status }) => {
  const iconMap: Record<ButtonStatus, React.ReactNode> = useMemo(
    () => ({
      idle: null,
      loading: <Loader2 className="animate-spin" size={20} />,
      success: <Check size={20} />,
      error: <X size={20} />,
    }),
    []
  )

  const icon = iconMap[status]
  if (!icon) return null

  return (
    <motion.div
      key={status}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      {icon}
    </motion.div>
  )
}

const useButtonStatus = (resolveTo: "success" | "error") => {
  const [status, setStatus] = useState<ButtonStatus>("idle")

  const handleSubmit = useCallback(() => {
    setStatus("loading")
    setTimeout(() => {
      setStatus(resolveTo)
    }, 2000)
  }, [resolveTo])

  const reset = useCallback(() => {
    setStatus("idle")
  }, [])

  return { status, handleSubmit, reset }
}

const SlideButton = forwardRef<HTMLButtonElement, SlideButtonProps>(
  ({ 
    className, 
    onComplete,
    resetDelay = 3000,
    resolveTo = "success",
    text = "Slide to confirm",
    completedText = "Confirmed",
    ...props 
  }, ref) => {
    const [isDragging, setIsDragging] = useState(false)
    const [completed, setCompleted] = useState(false)
    const { status, handleSubmit, reset } = useButtonStatus(resolveTo)

    const dragX = useMotionValue(0)
    const springX = useSpring(dragX, ANIMATION_CONFIG.spring)
    const dragProgress = useTransform(
      springX,
      [0, DRAG_CONSTRAINTS.right],
      [0, 1]
    )
    const adjustedWidth = useTransform(springX, (x) => x + 10)

    const handleDragStart = useCallback(() => {
      if (completed) return
      setIsDragging(true)
    }, [completed])

    const handleDragEnd = useCallback(() => {
      if (completed) return
      setIsDragging(false)

      const progress = dragProgress.get()
      if (progress >= DRAG_THRESHOLD) {
        setCompleted(true)
        handleSubmit()
        onComplete?.()
        
        // Auto reset after delay
        setTimeout(() => {
          setCompleted(false)
          reset()
          dragX.set(0)
        }, resetDelay)
      } else {
        dragX.set(0)
      }
    }, [completed, dragProgress, handleSubmit, onComplete, resetDelay, reset, dragX])

    const handleDrag = useCallback((
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      if (completed) return
      const newX = Math.max(0, Math.min(info.offset.x, DRAG_CONSTRAINTS.right))
      dragX.set(newX)
    }, [completed, dragX])

    const getStatusColor = () => {
      switch (status) {
        case "success":
          return "bg-green-500 hover:bg-green-600"
        case "error":
          return "bg-red-500 hover:bg-red-600"
        case "loading":
          return "bg-blue-500"
        default:
          return ""
      }
    }

    return (
      <div className="relative">
        {/* Track container */}
        <motion.div
          animate={completed ? BUTTON_STATES.completed : BUTTON_STATES.initial}
          transition={{
            type: "spring" as const,
            stiffness: ANIMATION_CONFIG.spring.stiffness,
            damping: ANIMATION_CONFIG.spring.damping,
            mass: ANIMATION_CONFIG.spring.mass,
          }}
          className={cn(
            "relative flex h-9 items-center justify-center rounded-full",
            "bg-background border-2 border-border shadow-sm overflow-hidden"
          )}
        >
          {/* Progress background */}
          {!completed && (
            <motion.div
              style={{ width: adjustedWidth }}
              className="absolute inset-y-0 left-0 z-0 rounded-full bg-primary/10"
            />
          )}

          {/* Text overlay */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={completed ? "completed" : "idle"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className={cn(
                  "text-xs font-medium select-none truncate",
                  completed ? "text-primary" : "text-muted-foreground"
                )}
              >
                {completed ? completedText : text}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Draggable button handle */}
          <AnimatePresence>
            {!completed && (
              <motion.div
                drag="x"
                dragConstraints={DRAG_CONSTRAINTS}
                dragElastic={0.05}
                dragMomentum={false}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrag={handleDrag}
                style={{ x: springX }}
                className="absolute -left-4 z-10 flex cursor-grab items-center justify-start active:cursor-grabbing"
                whileDrag={{ scale: 1.05 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  ref={ref}
                  disabled={status === "loading"}
                  {...props}
                  size="icon"
                  aria-label="Slide to confirm"
                  className={cn(
                    "h-8 w-8 rounded-full shadow-lg border-2 border-background",
                    "hover:shadow-xl transition-all duration-200",
                    isDragging && "scale-105",
                    className
                  )}
                >
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status feedback button */}
          <AnimatePresence>
            {completed && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Button
                  ref={ref}
                  disabled={status === "loading"}
                  {...props}
                  aria-label="Status feedback"
                  className={cn(
                    "h-full w-full rounded-full transition-all duration-300",
                    "border-2 border-background shadow-lg",
                    getStatusColor(),
                    className
                  )}
                >
                  <AnimatePresence mode="wait">
                    <StatusIcon status={status} />
                  </AnimatePresence>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    )
  }
)

SlideButton.displayName = "SlideButton"

export { SlideButton, type SlideButtonProps }