"use client"

import React, { forwardRef, useCallback, useState, useMemo, useEffect } from "react"
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
  successText?: string
  errorText?: string
  disabled?: boolean
  autoReset?: boolean
  className?: string
  buttonClassName?: string
  // Nouvelles props pour le contrôle externe
  status?: ButtonStatus
  onStatusChange?: (status: ButtonStatus) => void
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

const useButtonStatus = (resolveTo: "success" | "error", externalStatus?: ButtonStatus, onStatusChange?: (status: ButtonStatus) => void) => {
  const [internalStatus, setInternalStatus] = useState<ButtonStatus>("idle")
  
  // Utilise le status externe si fourni, sinon le status interne
  const status = externalStatus ?? internalStatus

  const handleSubmit = useCallback(() => {
    const newStatus = "loading"
    if (externalStatus === undefined) {
      setInternalStatus(newStatus)
    }
    onStatusChange?.(newStatus)

    // Si on n'a pas de contrôle externe, on simule l'async operation
    if (externalStatus === undefined) {
      setTimeout(() => {
        const finalStatus = resolveTo
        setInternalStatus(finalStatus)
        onStatusChange?.(finalStatus)
      }, 2000)
    }
  }, [resolveTo, externalStatus, onStatusChange])

  const reset = useCallback(() => {
    const newStatus = "idle"
    if (externalStatus === undefined) {
      setInternalStatus(newStatus)
    }
    onStatusChange?.(newStatus)
  }, [externalStatus, onStatusChange])

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
      successText = "Success!",
      errorText = "Error!",
      disabled = false,
      autoReset = false,
      status: externalStatus,
      onStatusChange,
      ...props
    },
    ref
  ) => {
    const [completed, setCompleted] = useState(false)
    const { status, handleSubmit, reset } = useButtonStatus(resolveTo, externalStatus, onStatusChange)

    const dragX = useMotionValue(0)
    const springX = useSpring(dragX, ANIMATION_CONFIG.spring)
    const dragProgress = useTransform(springX, [0, DRAG_CONSTRAINTS.right], [0, 1])
    const adjustedWidth = useTransform(springX, (x) => x + 10)

    // Effet pour synchroniser l'état completed avec le status externe
    useEffect(() => {
      if (externalStatus && (externalStatus === "success" || externalStatus === "error")) {
        setCompleted(true)
        dragX.set(DRAG_CONSTRAINTS.right)
      } else if (externalStatus === "idle") {
        setCompleted(false)
        dragX.set(0)
      }
    }, [externalStatus, dragX])

    const handleDragEnd = useCallback(() => {
      if (completed || disabled) return

      const progress = dragProgress.get()
      if (progress >= DRAG_THRESHOLD) {
        setCompleted(true)
        dragX.set(DRAG_CONSTRAINTS.right)
        handleSubmit()
        onComplete?.()

        if (autoReset && externalStatus === undefined) {
          setTimeout(() => {
            setCompleted(false)
            reset()
            dragX.set(0)
          }, resetDelay)
        }
      } else {
        dragX.set(0)
      }
    }, [completed, disabled, dragProgress, handleSubmit, onComplete, resetDelay, reset, dragX, autoReset, externalStatus])

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
          return "bg-green-400 dark:bg-green-500 hover:bg-green-600 border-green-400"
        case "error":
          return "bg-red-500 hover:bg-red-600 border-red-400"
        case "loading":
          return "bg-blue-500 border-blue-400"
        default:
          return ""
      }
    }

    const getStatusText = () => {
      switch (status) {
        case "loading":
          return loadingText
        case "success":
          return successText
        case "error":
          return errorText
        default:
          return text
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
              {getStatusText()}
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

export { SlideButton, type SlideButtonProps, type ButtonStatus }