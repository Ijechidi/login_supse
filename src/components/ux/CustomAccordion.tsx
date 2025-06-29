import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


interface CustomAccordionProps {
  trigger: React.ReactNode
  content: React.ReactNode
  value: string
  defaultValue?: string
  className?: string
}

export default function CustomAccordion({
  trigger,
  content,
  value,
  defaultValue,
  className,
}: CustomAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultValue}
      className={className}
    >
      <AccordionItem className="" value={value}>
        <AccordionTrigger className="p-0 [&>svg]:hidden no-underline hover:no-underline">{trigger}</AccordionTrigger>
        <AccordionContent className="transition-all duration-300 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
