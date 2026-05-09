export default function ProductLoading() {
  return (
    <div className="content-container py-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-100" />
        <div className="space-y-6">
          <div className="h-8 w-3/4 animate-pulse rounded bg-gray-100" />
          <div className="h-5 w-1/3 animate-pulse rounded bg-gray-100" />
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
          </div>
          <div className="h-10 w-full animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    </div>
  )
}
