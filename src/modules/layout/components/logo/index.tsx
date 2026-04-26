import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface LogoProps {
  className?: string
}

/**
 * Logo component - displays store branding
 * 
 * Usage:
 * <Logo /> - uses default styling
 * <Logo className="w-32" /> - custom size
 * 
 * Image Location: /public/logo.png
 */
export default function Logo({ className = "" }: LogoProps) {
  return (
    <LocalizedClientLink
      href="/"
      className={`hover:text-ui-fg-base transition-colors flex items-center ${className}`}
      data-testid="nav-logo"
      aria-label="Store home"
    >
      <Image
        src="/logo.png"
        alt="Super Raça Logo"
        width={60}
        height={20}
        priority // Important: Logo is in header, load immediately
        className="h-auto invert" // Maintain aspect ratio, invert colors
      />
    </LocalizedClientLink>
  )
}
