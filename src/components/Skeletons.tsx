// skeleton for shop page products

export const ProductSkeleton = () => {
  return (
    <div className="animate-pulse bg-neutral-1 rounded-lg shadow-sm overflow-hidden relative w-full">
      {/* Image placeholder */}
      <div className="bg-neutral-3 aspect-square w-full" />

      <div className="p-3 space-y-2">
        {/* Title */}
        <div className="h-4 bg-neutral-3 rounded w-3/4" />

        {/* Price */}
        <div className="h-4 bg-neutral-3 rounded w-1/2" />

        {/* Button */}
        <div className="h-8 bg-neutral-3 rounded-md w-full mt-3" />
      </div>

      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-neutral-1/40 to-transparent" />
      {/* <div className="aspect-square" /> */}
    </div>
  );
};


// skeleton for searched products
export const SearchProductSkeleton = () => {
  return (
    <div className="animate-pulse h-32 bg-neutral-1 rounded-lg shadow-sm overflow-hidden relative w-full flex items-center gap-2 p-2">
      <div className="bg-neutral-3 h-full aspect-square rounded-md" />
      <div className="space-y-1.5 w-full grow">
        {/* Rating */}
        <div className="h-4 w-1/3 bg-neutral-3 rounded" />
        {/* Title */}
        <div className="h-4 w-1/2 bg-neutral-3 rounded" />

        {/* Description */}
        <div className="h-4 w-full bg-neutral-3 rounded" />
        {/* Price */}
        <div className="h-4 w-1/3 bg-neutral-3 rounded" />
      </div>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-neutral-1/40 to-transparent" />
    </div>
  )
}