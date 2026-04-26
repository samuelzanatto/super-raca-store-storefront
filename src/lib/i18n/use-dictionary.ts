"use client"

import { useParams } from "next/navigation"
import { getLocaleForCountry } from "./config"
import { getDictionary } from "./dictionaries"

export const useDictionary = () => {
  const params = useParams()
  const countryCode =
    typeof params.countryCode === "string" ? params.countryCode : undefined

  return getDictionary(getLocaleForCountry(countryCode))
}
