/**
 * Convert decimal numbers to fraction strings using Unicode fraction characters
 * Commonly used in cooking measurements
 */
export function decimalToFraction(decimal: number | null): string {
  if (decimal === null || decimal === undefined) {
    return ''
  }

  const wholeNumber = Math.floor(decimal)
  const remainder = decimal - wholeNumber

  // Common cooking fractions
  const fractionMap: { [key: number]: string } = {
    0.125: '⅛',
    0.25: '¼',
    0.333: '⅓',
    0.375: '⅜',
    0.5: '½',
    0.625: '⅝',
    0.666: '⅔',
    0.75: '¾',
    0.875: '⅞',
  }

  // Find closest fraction (within 0.01 tolerance)
  let fractionStr = ''
  for (const [dec, frac] of Object.entries(fractionMap)) {
    if (Math.abs(remainder - parseFloat(dec)) < 0.01) {
      fractionStr = frac
      break
    }
  }

  // If no close match found, use decimal
  if (!fractionStr && remainder > 0) {
    // Round to 2 decimal places
    const rounded = Math.round(remainder * 100) / 100
    fractionStr = rounded.toString()
  }

  // Build final string
  if (wholeNumber === 0 && fractionStr) {
    return fractionStr
  } else if (wholeNumber > 0 && fractionStr) {
    return `${wholeNumber}${fractionStr}`
  } else if (wholeNumber > 0) {
    return wholeNumber.toString()
  }

  return decimal.toString()
}
