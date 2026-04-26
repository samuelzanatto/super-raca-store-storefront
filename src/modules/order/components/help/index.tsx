import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"
import { getRequestLocale } from "@lib/data/locale-actions"
import { getDictionary } from "@lib/i18n/dictionaries"

const Help = async () => {
  const dictionary = getDictionary(await getRequestLocale())

  return (
    <div className="mt-6">
      <Heading className="text-base-semi">{dictionary.order.needHelp}</Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <LocalizedClientLink href="/contact">
              {dictionary.order.contact}
            </LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact">
              {dictionary.order.returnsExchanges}
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
