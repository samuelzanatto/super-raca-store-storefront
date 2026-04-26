import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import { getRequestLocale } from "@lib/data/locale-actions"
import { getDictionary } from "@lib/i18n/dictionaries"

const EmptyCartMessage = async () => {
  const dictionary = getDictionary(await getRequestLocale())

  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        {dictionary.cart.title}
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        {dictionary.cart.emptyDescription}
      </Text>
      <div>
        <InteractiveLink href="/store">
          {dictionary.cart.exploreProducts}
        </InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
