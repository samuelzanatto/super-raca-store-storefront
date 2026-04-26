import { Container, Heading, Text } from "@medusajs/ui"

import { isStripeLike, paymentInfoMap } from "@lib/constants"
import Divider from "@modules/common/components/divider"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { getRequestLocale } from "@lib/data/locale-actions"
import { getDictionary } from "@lib/i18n/dictionaries"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = async ({ order }: PaymentDetailsProps) => {
  const dictionary = getDictionary(await getRequestLocale())
  const payment = order.payment_collections?.[0].payments?.[0]
  const getPaymentTitle = (providerId: string) => {
    const title = paymentInfoMap[providerId].title

    if (title === "Credit card") {
      return dictionary.checkout.creditCard
    }

    if (title === "Manual Payment") {
      return dictionary.checkout.manualPayment
    }

    return title
  }

  return (
    <div>
      <Heading level="h2" className="flex flex-row text-3xl-regular my-6">
        {dictionary.checkout.payment}
      </Heading>
      <div>
        {payment && (
          <div className="flex items-start gap-x-1 w-full">
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                {dictionary.checkout.paymentMethod}
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method"
              >
                {getPaymentTitle(payment.provider_id)}
              </Text>
            </div>
            <div className="flex flex-col w-2/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                {dictionary.checkout.paymentDetails}
              </Text>
              <div className="flex gap-2 txt-medium text-ui-fg-subtle items-center">
                <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover">
                  {paymentInfoMap[payment.provider_id].icon}
                </Container>
                <Text data-testid="payment-amount">
                  {isStripeLike(payment.provider_id) && payment.data?.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : dictionary.order.paidAt(
                        convertToLocale({
                          amount: payment.amount,
                          currency_code: order.currency_code,
                        }),
                        new Date(payment.created_at ?? "").toLocaleString()
                      )}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>

      <Divider className="mt-8" />
    </div>
  )
}

export default PaymentDetails
