export default function StoreLoading() {
  return (
    <div className="content-container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div className="h-8 w-40 animate-pulse rounded bg-gray-100" />
        <div className="h-10 w-32 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 small:grid-cols-3 medium:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="aspect-[9/16] w-full animate-pulse rounded-lg bg-gray-100" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  )
}
