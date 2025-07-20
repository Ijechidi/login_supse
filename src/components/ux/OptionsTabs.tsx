// components/IconTabs.tsx
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
  } from "@/components/ui/tabs"
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import { Badge } from "@/components/ui/badge"
  import { LucideIcon } from "lucide-react"
  import React from "react"
  
  interface TabItem {
    value: string
    label: string
    icon: LucideIcon
    badgeCount?: number
    content: React.ReactNode
  }
  
  interface OptionTabsProps {
    tabs: TabItem[]
    defaultValue?: string
  }
  
  export function OptionTabs({ tabs, defaultValue }: OptionTabsProps) {
    return (
      <Tabs defaultValue={defaultValue ?? tabs[0]?.value} className="items-center">
        <TabsList>
          <TooltipProvider delayDuration={0}>
            {tabs.map((tab) => (
              <Tooltip key={tab.value}>
                <TooltipTrigger asChild>
                  <span>
                    <TabsTrigger
                      value={tab.value}
                      className="group relative py-3"
                    >
                      <tab.icon size={16} aria-hidden="true" />
                      {typeof tab.badgeCount === "number" && (
                        <Badge className="border-background absolute -top-2.5 left-full min-w-4 -translate-x-1.5 px-0.5 text-[10px]/[.875rem] transition-opacity group-data-[state=inactive]:opacity-50">
                          {tab.badgeCount}
                        </Badge>
                      )}
                    </TabsTrigger>
                  </span>
                </TooltipTrigger>
                <TooltipContent className="px-2 py-1 text-xs">
                  {tab.label}
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </TabsList>
  
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    )
  }
  