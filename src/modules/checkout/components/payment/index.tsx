"use client"

import { RadioGroup } from "@headlessui/react"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, Container, Heading, Text, clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer from "@modules/checkout/components/payment-container"
import { StripeContext } from "@modules/checkout/components/payment-wrapper/stripe-wrapper"
import Divider from "@modules/common/components/divider"
import { useDictionary } from "@lib/i18n/use-dictionary"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useContext, useEffect, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const dictionary = useDictionary()
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )
  const stripeReady = useContext(StripeContext)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    if (isStripeLike(method)) {
      setIsLoading(true)
      try {
        await initiatePaymentSession(cart, {
          provider_id: method,
        })
        router.refresh()
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      return router.push(pathname + "?" + createQueryString("step", "review"), {
        scroll: false,
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  const getPaymentTitle = (providerId?: string) => {
    const title = providerId ? paymentInfoMap[providerId]?.title : undefined

    if (title === "Credit card") {
      return dictionary.checkout.creditCard
    }

    if (title === "Manual Payment") {
      return dictionary.checkout.manualPayment
    }

    return title || providerId
  }

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          {dictionary.checkout.payment}
          {!isOpen && paymentReady && <CheckCircleSolid />}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
              data-testid="edit-payment-button"
            >
              {dictionary.checkout.edit}
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <>
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
              >
                {availablePaymentMethods.map((paymentMethod) => (
                  <div key={paymentMethod.id}>
                    <PaymentContainer
                      paymentInfoMap={paymentInfoMap}
                      paymentProviderId={paymentMethod.id}
                      selectedPaymentOptionId={selectedPaymentMethod}
                      disabled={isLoading}
                    />
                  </div>
                ))}
              </RadioGroup>
            </>
          )}

          {isStripeLike(selectedPaymentMethod) &&
            activeSession?.provider_id === selectedPaymentMethod &&
            stripeReady && (
              <StripePaymentElement
                isLoading={isLoading}
                setError={setError}
                onComplete={() =>
                  router.push(
                    pathname + "?" + createQueryString("step", "review"),
                    {
                      scroll: false,
                    }
                  )
                }
              />
          )}

          {paidByGiftcard && (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                {dictionary.checkout.paymentMethod}
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                {dictionary.checkout.giftCard}
              </Text>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          {!isStripeLike(selectedPaymentMethod) && (
            <Button
              size="large"
              className="mt-6"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={!selectedPaymentMethod && !paidByGiftcard}
              data-testid="submit-payment-button"
            >
              {dictionary.checkout.continueToReview}
            </Button>
          )}
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="flex items-start gap-x-1 w-full">
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  {dictionary.checkout.paymentMethod}
                </Text>
                <Text
                  className="txt-medium text-ui-fg-subtle"
                  data-testid="payment-method-summary"
                >
                  {getPaymentTitle(activeSession?.provider_id)}
                </Text>
              </div>
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  {dictionary.checkout.paymentDetails}
                </Text>
                <div
                  className="flex gap-2 txt-medium text-ui-fg-subtle items-center"
                  data-testid="payment-details-summary"
                >
                  <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard />
                    )}
                  </Container>
                  <Text>
                    {dictionary.checkout.anotherStepWillAppear}
                  </Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                {dictionary.checkout.paymentMethod}
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                {dictionary.checkout.giftCard}
              </Text>
            </div>
          ) : null}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

const StripePaymentElement = ({
  isLoading,
  setError,
  onComplete,
}: {
  isLoading: boolean
  setError: (message: string | null) => void
  onComplete: () => void
}) => {
  const dictionary = useDictionary()
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = useState(false)
  const [complete, setComplete] = useState(false)

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return
    }

    setSubmitting(true)
    setError(null)

    const { error } = await elements.submit()

    if (error) {
      setError(error.message || "Payment details are incomplete.")
      setSubmitting(false)
      return
    }

    setSubmitting(false)
    onComplete()
  }

  return (
    <div className="mt-5 transition-all duration-150 ease-in-out">
      <PaymentElement
        onChange={(event) => {
          setComplete(event.complete)
          if (event.complete) {
            setError(null)
          }
        }}
        options={{
          layout: "accordion",
        }}
      />
      <Button
        size="large"
        className="mt-6"
        onClick={handleSubmit}
        isLoading={submitting || isLoading}
        disabled={!complete || !stripe || !elements || submitting || isLoading}
        data-testid="submit-payment-button"
      >
        {dictionary.checkout.continueToReview}
      </Button>
    </div>
  )
}

export default Payment
