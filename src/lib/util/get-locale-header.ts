import { getLocale } from "@lib/data/locale-actions"
import { headers as nextHeaders } from "next/headers"

export async function getLocaleHeader() {
  const headers = await nextHeaders()
  const requestLocale = headers.get("x-medusa-locale")
  const locale = requestLocale || (await getLocale())

  if (!locale) {
    return {}
  }

  return {
    "x-medusa-locale": locale,
  } as const
}
