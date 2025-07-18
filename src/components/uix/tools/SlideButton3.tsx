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
  completed: { width: "12rem" },
}

const ANIMATION_CONFIG = {
  spring: {
    stiffness: 300,
    damping: 30,
    mass: 0.5,
  },
}

interface SlideButtonProps extends Omit<ButtonProps, "children"> {
  onComplete?: () => void
  resetDelay?: number
  resolveTo?: "success" | "error"
  text?: string
  loadingText?: string
  completedText?: string
  disabled?: boolean
  autoReset?: boolean
  className?: string
  buttonClassName?: string
}

const StatusIcon: React.FC<{ status: ButtonStatus }> = ({ status }) => {
  const iconMap: Record<ButtonStatus, React.ReactNode> = useMemo(
    () => ({
      idle: <SendHorizontal className="h-4 w-4" />,
      loading: <Loader2 className="animate-spin h-4 w-4" />,
      success: <Check className="h-4 w-4" />,
      error: <X className="h-4 w-4" />,
    }),
    []
  )

  return (
    <motion.div
      key={status}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      {iconMap[status]}
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
  (
    {
      className,
      buttonClassName,
      onComplete,
      resetDelay = 3000,
      resolveTo = "success",
      text = "Slide to confirm",
      loadingText = "Processing...",
      completedText = "Completed",
      disabled = false,
      autoReset = true,
      ...props
    },
    ref
  ) => {
    const [completed, setCompleted] = useState(false)
    const { status, handleSubmit, reset } = useButtonStatus(resolveTo)

    const dragX = useMotionValue(0)
    const springX = useSpring(dragX, ANIMATION_CONFIG.spring)
    const dragProgress = useTransform(springX, [0, DRAG_CONSTRAINTS.right], [0, 1])
    const adjustedWidth = useTransform(springX, (x) => x + 10)

    const handleDragEnd = useCallback(() => {
      if (completed || disabled) return

      const progress = dragProgress.get()
      if (progress >= DRAG_THRESHOLD) {
        setCompleted(true)
        dragX.set(DRAG_CONSTRAINTS.right)
        handleSubmit()
        onComplete?.()

        if (autoReset) {
          setTimeout(() => {
            setCompleted(false)
            reset()
            dragX.set(0)
          }, resetDelay)
        }
      } else {
        dragX.set(0)
      }
    }, [completed, disabled, dragProgress, handleSubmit, onComplete, resetDelay, reset, dragX, autoReset])

    const handleDrag = useCallback(
      (_: any, info: PanInfo) => {
        if (completed || disabled) return
        const newX = Math.max(0, Math.min(info.offset.x, DRAG_CONSTRAINTS.right))
        dragX.set(newX)
      },
      [completed, disabled, dragX]
    )

    const getStatusColor = () => {
      switch (status) {
        case "success":
          return " bg-green-400 dark:bg-green-500  hover:bg-green-600 border-green-400"
        case "error":
          return "bg-red-500 hover:bg-red-600 border-red-400"
        case "loading":
          return "bg-blue-500 border-blue-400"
        default:
          return ""
      }
    }

    return (
      <motion.div
        animate={BUTTON_STATES.initial}
        transition={{ ...ANIMATION_CONFIG.spring }}
        className={cn(
          "relative flex h-9 items-center justify-center rounded-full",
          "bg-muted/40 border border-border shadow-sm overflow-hidden",
          className
        )}
      >
        {!completed && (
          <motion.div
            style={{ width: adjustedWidth }}
            className="absolute inset-y-0 left-0 z-0 rounded-full bg-primary/20"
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <AnimatePresence mode="wait">
            <motion.span
              key={status}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              className={cn(
                "text-xs font-medium select-none truncate",
                completed ? "text-primary" : "text-muted-foreground"
              )}
            >
              {status === "loading"
                ? loadingText
                : completed
                ? completedText
                : text}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.div
          drag={!completed && !disabled ? "x" : false}
          dragConstraints={DRAG_CONSTRAINTS}
          dragElastic={0.05}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{
            x: springX,
            top: "50%",
            translateY: "-50%",
          }}
          className={cn(
            "absolute left-0 z-10 flex items-center justify-center",
            "cursor-grab active:cursor-grabbing"
          )}
          whileDrag={{ scale: 1.05 }}
        >
          <Button
            ref={ref}
            disabled={status === "loading" || disabled}
            {...props}
            size="icon"
            aria-label="Slide to confirm"
            className={cn(
              "h-8 w-8 rounded-full shadow-lg border-2 border-background",
              "hover:shadow-xl transition-all duration-200",
              completed && getStatusColor(),
              buttonClassName
            )}
          >
            <StatusIcon status={status} />
          </Button>
        </motion.div>
      </motion.div>
    )
  }
)

SlideButton.displayName = "SlideButton"

export { SlideButton, type SlideButtonProps }
