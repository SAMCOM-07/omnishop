import SearchBar from '@/components/SearchBar'
import { getProductsBySearch } from '@/lib/getProducts'
import Link from 'next/link';
const SearchPage = async ({ searchParams }: { searchParams: { q: string } }) => {

  const { q } = await searchParams;
  const products = q ? await getProductsBySearch(q) : [];

  const searchTags: string[] = [
    "Shirt",
    "White",
    "Kitchen",
    "Electronics",
    "Clothing",
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
            className="px-3 py-1 rounded-full text-sm bg-neutral-2 hover:bg-neutral-3 transition"
          >
            {tag}
          </Link>
        ))}
      </div>

      <div className='grid grid-col-3 gap-4 mt-6'>

        {
          products && (await products).map((product, index) =>
            <div key={index}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default SearchPage
