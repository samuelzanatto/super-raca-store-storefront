export default function CheckoutLoading() {
  return (
    <div className="content-container grid grid-cols-1 gap-x-40 gap-y-10 py-12 small:grid-cols-[1fr_416px]">
      <div className="space-y-6">
        <div className="h-8 w-40 animate-pulse rounded bg-gray-100" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-12 w-full animate-pulse rounded bg-gray-100" />
          ))}
        </div>
        <div className="h-10 w-36 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="space-y-4">
        <div className="h-6 w-32 animate-pulse rounded bg-gray-100" />
        <div className="h-28 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-40 w-full animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  )
}
