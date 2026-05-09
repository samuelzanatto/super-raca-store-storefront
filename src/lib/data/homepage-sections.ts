import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export async function getHomepageSections() {
  try {
    const next = {
      ...(await getCacheOptions("homepage-sections")),
      revalidate: 60,
    }

    const data = await sdk.client.fetch<{ sections: any[] }>(`/store/homepage-sections`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next,
      cache: "force-cache",
    })

    return data.sections || []
  } catch (error) {
    console.error("Error fetching homepage sections:", error)
    return []
  }
}
