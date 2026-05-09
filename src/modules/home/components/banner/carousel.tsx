"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

interface BannerCarouselProps {
  banners: Array<{
    id: string
    title: string
    description?: string
    image_url?: string
    link: string
    link_text?: string
  }>
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000) // Trocar a cada 5 segundos

    return () => clearInterval(interval)
  }, [banners.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  return (
    <section className="w-full py-6 content-container">
      <div className="relative w-full overflow-hidden rounded-2xl group bg-ui-bg-subtle">
        {/* Carousel Container com múltiplos cards */}
        <div className="relative h-[70vh] small:h-[70vh] w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="min-w-full h-full flex-shrink-0 relative"
              >
                {/* Image */}
                {banner.image_url ? (
                  <Image
                    src={banner.image_url}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    priority={banners[0]?.id === banner.id}
                    quality={95}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  />
                ) : null}

                {/* Link wrapping the entire banner if a link exists */}
                {banner.link ? (
                  banner.link.startsWith("http") ? (
                    <a
                      href={banner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10"
                      aria-label={banner.title}
                    />
                  ) : (
                    <Link
                      href={banner.link}
                      className="absolute inset-0 z-10"
                      aria-label={banner.title}
                    />
                  )
                ) : null}
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {banners.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Slide anterior"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Próximo slide"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map((banner, index) => (
              <button
                key={banner.id}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75 w-2"
                  }`}
                aria-label={`Ir para slide ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
