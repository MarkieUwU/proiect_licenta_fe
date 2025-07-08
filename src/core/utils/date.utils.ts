import { format, formatDistanceToNow } from 'date-fns'
import { ro } from 'date-fns/locale'
import i18n from '@/i18n/i18n'

/**
 * Get the appropriate locale for date-fns based on current language
 */
export const getDateLocale = () => {
  return i18n.language === 'ro' ? ro : undefined // undefined defaults to English
}

/**
 * Format a date using the current locale
 */
export const formatLocalizedDate = (date: Date, formatString: string) => {
  return format(date, formatString, {
    locale: getDateLocale()
  })
}

/**
 * Format distance to now using the current locale
 */
export const formatLocalizedDistanceToNow = (date: Date, options?: { addSuffix?: boolean }) => {
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: getDateLocale(),
    ...options
  })
}

/**
 * Format a date as localized string (equivalent to toLocaleString but consistent)
 */
export const formatLocalizedDateTime = (date: Date) => {
  return formatLocalizedDate(date, 'PPp') // Localized date and time format
}
