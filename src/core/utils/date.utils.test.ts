// Test file for date utilities
// Note: This project doesn't have a testing framework configured
// To add tests, install vitest or jest and uncomment the test code below

/*
Example tests for date utilities:

import { formatLocalizedDateTime, formatLocalizedDistanceToNow, getDateLocale } from './date.utils'
import i18n from '@/i18n/i18n'

describe('Date utilities', () => {
  beforeEach(() => {
    i18n.changeLanguage('en')
  })

  it('should return undefined locale for English', () => {
    i18n.changeLanguage('en')
    expect(getDateLocale()).toBeUndefined()
  })

  it('should return Romanian locale for Romanian', () => {
    i18n.changeLanguage('ro')
    const locale = getDateLocale()
    expect(locale).toBeDefined()
    expect(locale?.code).toBe('ro')
  })

  it('should format date time with appropriate locale', () => {
    const testDate = new Date('2024-01-15T10:30:00Z')
    
    i18n.changeLanguage('en')
    const englishFormatted = formatLocalizedDateTime(testDate)
    expect(englishFormatted).toBeTruthy()
    
    i18n.changeLanguage('ro')
    const romanianFormatted = formatLocalizedDateTime(testDate)
    expect(romanianFormatted).toBeTruthy()
    
    expect(englishFormatted).not.toBe(romanianFormatted)
  })

  it('should format distance to now with appropriate locale', () => {
    const testDate = new Date(Date.now() - 60000) // 1 minute ago
    
    i18n.changeLanguage('en')
    const englishDistance = formatLocalizedDistanceToNow(testDate)
    expect(englishDistance).toBeTruthy()
    expect(englishDistance).toContain('ago')
    
    i18n.changeLanguage('ro')
    const romanianDistance = formatLocalizedDistanceToNow(testDate)
    expect(romanianDistance).toBeTruthy()
    
    expect(englishDistance).not.toBe(romanianDistance)
  })
})
*/
