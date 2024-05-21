import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  if (isToday(date)) {
    return 'Today'
  } else if (isYesterday(date)) {
    return 'Yesterday'
  } else if (date.getFullYear() === new Date().getFullYear()) {
    return format(date, 'd MMM')
  } else {
    return format(date, 'd MMM yy')
  }
}
