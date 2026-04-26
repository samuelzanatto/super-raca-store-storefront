export const DEFAULT_LOCALE = "en-US"

export const COUNTRY_LOCALE_MAP: Record<string, string> = {
  br: "pt-BR",
}

export const getLocaleForCountry = (countryCode?: string | null) => {
  if (!countryCode) {
    return DEFAULT_LOCALE
  }

  return COUNTRY_LOCALE_MAP[countryCode.toLowerCase()] ?? DEFAULT_LOCALE
}

export const isPortuguese = (locale?: string | null) =>
  locale?.toLowerCase().startsWith("pt")
