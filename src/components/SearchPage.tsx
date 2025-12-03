'use client'

import { SearchProductSkeleton } from '@/components/Skeletons';
import SearchBar from '@/components/SearchBar';
import { getProductsBySearch } from '@/lib/getProducts';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import Rating from '@/components/Rating';
import { useSearchParams } from 'next/navigation';
import { ProductType } from '@/types/types';

const SearchPage = ({ setIsSearchOpen }: { setIsSearchOpen: Dispatch<SetStateAction<boolean>> }) => {
  const searchParams = useSearchParams();
  const q = searchParams.get('q'); // Get the query parameter 'q'
  const [products, setProducts] = useState<ProductType[]>([]); // State to hold fetched products
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      if (q) {
        const result = await getProductsBySearch(q);
        setProducts(result);
      } else {
        setProducts([]); // Reset if no query
      }
      setLoading(false); // Finish loading
    };

    fetchProducts();
  }, [q]); // Depend on `q` changes

  // Handle loading state
  if (loading) {
    return (
      <div className='flex flex-col gap-3 mt-18 container max-w-xl'>
        {Array.from({ length: 10 }).map((_, index) => <SearchProductSkeleton key={index} />)}
      </div>
    );
  }

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
    "Table",
    "Outdoor",
    "Sports",
    "Appliances",
    "Jewelry"
  ];

  return (

    <div className='container max-w-xl max-auto'>
      <div className='sticky inset-0 z-40 pt-8 pb-2 bg-neutral-1 shadow-[0_0_0_10px] shadow-neutral-1'>
        <SearchBar setIsSearchOpen={setIsSearchOpen} />
      </div>

      <h2 className='text-center mt-8'>Quick Search</h2>
      <div className="flex flex-wrap gap-2 mt-2 justify-center">
        {searchTags.map(tag => (
          <Link
            href={`?q=${tag.toLowerCase()}`}
            key={tag}
            className="px-3 text-neutral-4 py-1 rounded-full text-xs bg-neutral-2 hover:bg-neutral-3 transition border border-border"
          >
            {tag}
          </Link>
        ))}
      </div>

      {
        products.length > 0 && <h2 className='mt-12'>{products.length > 1 ? `Search results for "${q}"` : `Search result for "${q}"`}</h2>
      }

      <div className='flex flex-col gap-3 mb-12'>
        {
          products.length ? products.map((product, index) =>
            <Link onClick={() => setIsSearchOpen(false)} href={`/shop/${product.id}`} key={index} className='flex items-center mt-4 gap-4 group hover:shadow-sm transition-all hover:skew-1 duration-500 shadow-lg p-2 rounded-md border border-border/50'>
              <div className='min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px] overflow-hidden rounded-md bg-neutral-2 grid'>
                <Image priority src={product.images[0].url.replace(
                  "/upload/",
                  "/upload/f_auto,q_auto,w_600/"
                )} width={400} height={400} alt={product.name} className='w-full h-full object-cover object-center group-hover:scale-110 group-active:scale-95 transition-all duration-500' />
              </div>
              <div>
                <Rating rating={product.rating} />
                <h3>{product.name}</h3>
                <p className='line-clamp-2 leading-tight text-xs md:text-sm'>{product.description}</p>
                <span className='text-xs font-bold'>{product.discount ? '$' + product.discountedAmount : '$' + product.price}</span>
                <span className='text-xs ml-4 line-through text-neutral-4'>{product.discount ? `$${product.price}` : ''}</span>
              </div>
            </Link>
          ) : q ?
            <p className='text-center col-span-full text-xl text-neutral-4 py-42'>No search result for <span className='font-semibold italic capitalize'>"{q}"</span> !!!</p> :
            <p className='text-center col-span-full text-xl text-neutral-4 py-42'>Search For Any Product Here !!!</p>
        }
      </div>
    </div>

  );
}

export default SearchPage;
