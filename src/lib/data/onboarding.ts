"use server"
import { cookies as nextCookies } from "next/headers"
import { redirect } from "next/navigation"

export async function resetOnboardingState(orderId: string) {
  const cookies = await nextCookies()
  const backendUrl = process.env.MEDUSA_BACKEND_URL || "https://api.superraca.com"

  cookies.set("_medusa_onboarding", "false", { maxAge: -1 })
  redirect(`${backendUrl}/app/orders/${orderId}`)
}
