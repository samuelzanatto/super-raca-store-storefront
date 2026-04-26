import { getRegion } from "@lib/data/regions"
import ProductCard from "../product-card"
import { listProducts } from "@lib/data/products"
import { getDictionary } from "@lib/i18n/dictionaries"
import { getLocaleForCountryCode } from "@lib/data/locale-actions"

export default async function ProductsSection({
  countryCode,
  limit = 8,
  collectionId,
  title = "Produtos em Destaque",
}: {
  countryCode: string
  limit?: number
  collectionId?: string
  title?: string
}) {
  const dict = getDictionary(await getLocaleForCountryCode(countryCode))
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const queryParams: any = { limit }
  if (collectionId) {
    queryParams.collection_id = [collectionId]
  }

  const { response } = await listProducts({
    queryParams,
    countryCode,
  })

  if (!response.products || response.products.length === 0) {
    return null
  }

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="content-container mx-auto">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-gray-600 text-lg">
              {dict.home.productSectionDescription}
            </p>
          </div>

          <a
            href={`/${countryCode}/store`}
            className="inline-flex items-center justify-center px-5 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200 sm:shrink-0"
          >
            {dict.home.viewAllProducts}
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {response.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currencyCode={region.currency_code}
              countryCode={countryCode}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
