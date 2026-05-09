import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { retrieveRegion } from "@lib/data/regions"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout",
}

export default async function Checkout() {
  const [cart, customer] = await Promise.all([
    retrieveCart(),
    retrieveCustomer(),
  ])

  if (!cart) {
    return notFound()
  }

  const regionCountries = cart.region?.countries?.filter((country) => country.iso_2)
  const region =
    regionCountries?.length || !cart.region_id
      ? cart.region
      : await retrieveRegion(cart.region_id)

  const checkoutCart = region ? { ...cart, region } : cart

  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <PaymentWrapper cart={checkoutCart}>
        <CheckoutForm cart={checkoutCart} customer={customer} />
      </PaymentWrapper>
      <CheckoutSummary cart={checkoutCart} />
    </div>
  )
}
