import { Suspense } from "react"
import { listBanners } from "@lib/data/banners"
import BannerCarousel from "./carousel"

/**
 * Dynamic Banner Carousel Component
 * 
 * Features:
 * - Fetches banners from backend
 * - Auto-play carousel with loop functionality
 * - Rounded corners and side margins
 * - Responsive design for mobile and desktop
 * - Pagination dots and navigation arrows
 * - Supports both URL and base64 image storage
 * - Accessible with keyboard navigation
 * 
 * Best Practices Applied:
 * - Dynamic content from backend (not hardcoded)
 * - Image optimization with Next.js Image component
 * - ARIA labels for accessibility
 * - Semantic HTML structure
 * - Touch-friendly controls (44px minimum)
 */
export default async function BannerSection() {
  const banners = await listBanners()
  const activeBanners = banners?.filter((b) => b.is_active) || []

  if (!activeBanners || activeBanners.length === 0) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <BannerCarousel banners={activeBanners} />
    </Suspense>
  )
}
