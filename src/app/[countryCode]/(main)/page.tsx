import { Metadata } from "next"

import BannerSection from "@modules/home/components/banner"
import ProductsSection from "@modules/home/components/products-section"
import FeaturedProducts from "@modules/home/components/featured-products"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getHomepageSections } from "@lib/data/homepage-sections"

export const metadata: Metadata = {
  title: "Super Raça - Loja Oficial",
  description:
    "A melhor loja de produtos para o seu pet.",
}

export const dynamic = "force-dynamic"

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const sections = await getHomepageSections()

  if (sections.length === 0) {
    return null
  }

  const needsCollections = sections.some(
    (section: any) => section.type === "categories_grid"
  )

  const region = needsCollections ? await getRegion(countryCode) : null
  const { collections } = needsCollections
    ? await listCollections({
        fields: "id, handle, title",
      })
    : { collections: [] }

  if (needsCollections && (!collections || !region)) {
    return null
  }

  return (
    <>
      {sections.map((section: any) => {
        switch (section.type) {
          case "hero_banner":
            return <BannerSection key={section.id} />
          case "featured_products":
            return (
              <ProductsSection
                key={section.id}
                countryCode={countryCode}
                title={section.title}
                limit={section.config?.limit || 8}
              />
            )
          case "single_category_grid":
            return (
              <ProductsSection
                key={section.id}
                countryCode={countryCode}
                title={section.title}
                limit={section.config?.limit || 8}
                collectionId={section.config?.collection_id}
              />
            )
          case "categories_grid":
            return (
              <div key={section.id} className="py-12">
                <ul className="flex flex-col gap-x-6">
                  <FeaturedProducts collections={collections} region={region!} />
                </ul>
              </div>
            )
          case "custom_html":
            return (
               <div key={section.id} dangerouslySetInnerHTML={{ __html: section.config?.html || "" }} />
            )
          default:
            return null
        }
      })}
    </>
  )
}
