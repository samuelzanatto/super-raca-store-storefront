import { sdk } from "@lib/config"
import { cache } from "react"
import { getCacheOptions } from "./cookies"

export type Banner = {
  id: string
  title: string
  description?: string
  image_url?: string
  link: string
  link_text?: string
  is_active: boolean
  order: number
}

/**
 * Fetches active banners from the backend
 * Cached for performance, revalidated on interval
 */
export const listBanners = cache(async (): Promise<Banner[]> => {
  try {
    const next = {
      ...(await getCacheOptions("banners")),
      revalidate: 60,
    }

    const response = await sdk.client.fetch<{
      banners: Banner[]
    }>(`/store/banners`, {
      method: "GET",
      next,
      cache: "force-cache",
    })

    return response.banners || []
  } catch (error) {
    console.error("Error fetching banners:", error)
    return []
  }
})

/**
 * Fetches a single banner by ID
 */
export const retrieveBanner = cache(
  async (id: string): Promise<Banner | null> => {
    try {
      const next = {
        ...(await getCacheOptions("banners")),
        revalidate: 60,
      }

      const response = await sdk.client.fetch<{
        banner: Banner
      }>(`/store/banners/${id}`, {
        method: "GET",
        next,
        cache: "force-cache",
      })

      return response.banner || null
    } catch (error) {
      console.error(`Error fetching banner ${id}:`, error)
      return null
    }
  }
)
