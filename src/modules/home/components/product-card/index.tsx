"use client"

import { addToCart } from "@lib/data/cart"
import { useDictionary } from "@lib/i18n/use-dictionary"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface ProductCardProps {
  product: HttpTypes.StoreProduct
  currencyCode: string
  countryCode: string
}

export default function ProductCard({
  product,
  currencyCode,
  countryCode,
}: ProductCardProps) {
  const dict = useDictionary()
  const [isLoading, setIsLoading] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const mainImage = product.images?.[0]?.url || "/placeholder-product.svg"
  const variant = product.variants?.[0]

  if (!variant) {
    return null
  }

  const calculatedPrice = variant.calculated_price
  const inventoryQuantity = variant.inventory_quantity ?? 0
  const isInStock =
    variant.manage_inventory === false ||
    variant.allow_backorder ||
    inventoryQuantity > 0

  const formatPrice = (amount: number | null | undefined): string => {
    if (amount === null || amount === undefined) {
      return dict.product.priceUnavailable
    }

    return new Intl.NumberFormat(countryCode === "br" ? "pt-BR" : "en-US", {
      style: "currency",
      currency: currencyCode.toUpperCase(),
    }).format(amount)
  }

  const handleAddToCart = async () => {
    if (!isInStock || !variant.id) return

    setIsLoading(true)
    try {
      await addToCart({
        variantId: variant.id,
        quantity: 1,
        countryCode,
      })
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article className="group flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link
        href={`/${countryCode}/products/${product.handle}`}
        className="relative overflow-hidden bg-gray-100 aspect-square"
      >
        <Image
          src={mainImage}
          alt={product.title || "Product image"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />

        {!isInStock && (
          <div className="absolute top-3 left-3 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-medium">
            {dict.product.outOfStockBadge}
          </div>
        )}

        {calculatedPrice?.price_type === "sale" && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {dict.product.sale}
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-4">
        <Link
          href={`/${countryCode}/products/${product.handle}`}
          className="hover:text-ui-fg-muted transition-colors mb-2"
        >
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {product.description && (
          <p className="text-xs text-gray-500 line-clamp-1 mb-3">
            {product.description}
          </p>
        )}

        <div className="flex-1" />

        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(calculatedPrice?.calculated_amount)}
            </span>

            {calculatedPrice?.price_type === "sale" &&
              calculatedPrice.original_amount && (
                <span className="text-sm line-through text-gray-400">
                  {formatPrice(calculatedPrice.original_amount)}
                </span>
              )}
          </div>

          {!isInStock && (
            <p className="text-xs text-gray-500 mt-1">
              {dict.product.outOfStock}
            </p>
          )}
          {isInStock &&
            variant.manage_inventory !== false &&
            !variant.allow_backorder &&
            inventoryQuantity <= 5 &&
            inventoryQuantity > 0 && (
              <p className="text-xs text-orange-600 font-medium mt-1">
                {dict.product.onlyLeft(inventoryQuantity)}
              </p>
            )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!isInStock || isLoading}
          className={`w-full py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
            addedToCart
              ? "bg-green-500 text-white"
              : isInStock
              ? "bg-black text-white hover:bg-gray-800 active:bg-gray-900"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          } ${isLoading ? "opacity-75" : ""}`}
        >
          {isLoading
            ? dict.product.adding
            : addedToCart
            ? dict.product.added
            : isInStock
            ? dict.product.addToCart
            : dict.product.unavailable}
        </button>
      </div>
    </article>
  )
}
