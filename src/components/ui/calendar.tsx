"use client"

import { DayPicker, type DayPickerProps } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

const nav =
  "inline-flex size-8 items-center justify-center rounded-full text-[#1B3B2B] transition hover:bg-[#1B3B2B]/10 disabled:opacity-30"

function Calendar({ className, classNames, ...props }: DayPickerProps) {
  return (
    <DayPicker
      showOutsideDays
      className={cn("p-1", className)}
      classNames={{
        root: "relative w-fit",
        months: "flex flex-col",
        month: "space-y-2",
        month_caption: "flex h-8 items-center justify-center",
        caption_label: "text-sm font-semibold text-[#1B3B2B]",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous: nav,
        button_next: nav,
        month_grid: "border-collapse",
        weekdays: "",
        weekday: "size-9 text-xs font-medium text-[#1B3B2B]/60",
        week: "",
        day: "p-0 text-center",
        day_button:
          "size-9 rounded-full text-sm transition hover:bg-[#1B3B2B]/10 focus-visible:outline-2 focus-visible:outline-[#D96B43]",
        selected:
          "[&>button]:bg-[#D96B43] [&>button]:text-white [&>button:hover]:bg-[#D96B43]",
        today: "font-bold text-[#D96B43]",
        outside: "opacity-35",
        disabled: "pointer-events-none opacity-30",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" aria-hidden />
          ) : (
            <ChevronRight className="size-4" aria-hidden />
          ),
      }}
      {...props}
    />
  )
}

export { Calendar }
