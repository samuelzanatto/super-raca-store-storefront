import { sdk } from "@lib/config"

export async function getHomepageSections() {
  try {
    const data = await sdk.client.fetch<{ sections: any[] }>(`/store/homepage-sections`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    return data.sections || []
  } catch (error) {
    console.error("Error fetching homepage sections:", error)
    return []
  }
}
