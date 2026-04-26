"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { useDictionary } from "@lib/i18n/use-dictionary"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const dictionary = useDictionary()
  const sortOptions = [
    {
      value: "created_at",
      label: dictionary.store.latestArrivals,
    },
    {
      value: "price_asc",
      label: dictionary.store.priceLowHigh,
    },
    {
      value: "price_desc",
      label: dictionary.store.priceHighLow,
    },
  ]

  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <FilterRadioGroup
      title={dictionary.store.sortBy}
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts
