import { Suspense } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import Logo from "@modules/layout/components/logo"
import { getRequestLocale } from "@lib/data/locale-actions"
import { getDictionary } from "@lib/i18n/dictionaries"

/**
 * Main Navigation Component
 * 
 * Layout: Logo (left) | spacing | Account, Cart (right)
 * 
 * Best Practices Applied:
 * - Sticky positioning for always accessible cart
 * - Logo links to homepage
 * - Cart always visible (critical ecommerce pattern)
 * - Account link for logged-in users
 * - Responsive layout adapts to mobile
 */
export default async function Nav() {
  const dict = getDictionary(await getRequestLocale())

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto duration-200 bg-white">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          {/* Logo - Left Side */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <Logo />
          </div>

          {/* Navigation Items - Right Side */}
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            {/* Account Link - Hidden on mobile, visible on small screens and up */}
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base transition-colors"
                href="/account"
                data-testid="nav-account-link"
                aria-label={dict.nav.account}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </LocalizedClientLink>
            </div>

            {/* Cart Button - Always Visible */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2 items-center transition-colors"
                  href="/cart"
                  data-testid="nav-cart-link"
                  aria-label={dict.nav.cart}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span className="text-sm">0</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
