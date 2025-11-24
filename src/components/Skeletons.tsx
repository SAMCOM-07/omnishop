// skeleton for shop page products

export const ProductSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow-sm overflow-hidden relative w-full">
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

      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
      {/* <div className="aspect-square" /> */}
    </div>
  );
};


// skeleton for searched products
export const SearchProductSkeleton = () => {
  return (
    <div>
      <div className="bg-neutral-3 aspect-square w-full" />
      <div></div>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
    </div>
  )
}