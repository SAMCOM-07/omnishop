import { SearchProductSkeleton } from '@/components/Skeletons';
import SearchBar from '@/components/SearchBar'
import { getProductsBySearch } from '@/lib/getProducts'
import Link from 'next/link';
import { Suspense } from 'react';
const SearchPage = async ({ searchParams }: { searchParams: { q: string } }) => {

  const { q } = await searchParams;
  const products = q ? await getProductsBySearch(q) : [];

  const searchTags: string[] = [
    "Shirt",
    "White",
    "Kitchen",
    "Electronics",
    "Short",
    "Gown",
    "Beauty",
    "Health",
    "Wellness",
    "Accessories",
    "Baby",
    "Kids",
    "Shoe",
    "Bag",
    "Phone",
    "Sofa",
    "Tale",
    "Outdoor",
    "Sports",
    "Appliances",
    "Jewelry"
  ];


  return (
    <div className='h-screen mt-4 container'>
      <SearchBar />

      <div className="flex flex-wrap gap-2 mt-6 max-w-2xl mx-auto justify-center">
        {searchTags.map(tag => (
          <Link
            href={`/search?q=${tag.toLowerCase()}`}
            key={tag}
            className="px-3 text-neutral-4 py-1 rounded-full text-xs bg-neutral-2 hover:bg-neutral-3 transition"
          >
            {tag}
          </Link>
        ))}
      </div>


      <Suspense fallback={<div className='flex flex-col gap-3 mt-6'>
        {Array.from({ length: 10 }).map((_, index) => <SearchProductSkeleton key={index} />)}
      </div>}>
        <div className='grid grid-col-3 gap-4 mt-18 max-w-xl mx-auto'>
          {
            products && (await products).map((product, index) =>
              <div key={index}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
              </div>
            )
          }
        </div>
      </Suspense>


    </div>
  )
}

export default SearchPage
