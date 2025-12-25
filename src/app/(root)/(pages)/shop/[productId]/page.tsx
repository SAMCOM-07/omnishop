import { AddToCartBtn, GoBackButton, LinkButton, WishListBtnWithText } from "@/components/Buttons";
import ProductCard from "@/components/ProductCard";
import ProductDetailsImages from "@/components/ProductDetailsImages";
import { ProductSkeleton } from "@/components/Skeletons";
import Rating from "@/components/Rating";
import { getProductById, getRelatedProducts } from "@/lib/getProducts";
import { Minus, Plus } from "lucide-react";
import { Suspense } from "react";
import { ProductType } from "@/types/types";
import Link from "next/link";

export default async function ProductDetailsPage({ params }: { params: { productId: string } }) {

  const { productId } = await params;

  const product: ProductType = await getProductById(productId);
  const relatedProducts: ProductType[] = await getRelatedProducts(product?.category || '', productId);


  if (!product) {
    return (
      <div className="container py-20 text-center h-screen">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <GoBackButton />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-12">
        <ProductDetailsImages productImages={product.images} discount={product.discount} />
        <div className="mt-6 md:mt-0 space-y-4 max-w-xl">
          <Rating rating={product.rating} />
          <h1 className="text font-bold">{product.name}</h1>
          <p className="text-neutral-4 text-sm font-poppins">{product.description}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {
              product.tags && product.tags.map((tag, i) =>
                <Link href={`/search?q=${encodeURIComponent(tag)}`}
                  key={i}
                  className="bg-blue text-neutral-1 rounded-md py-1 px-3 text-xs font-inter"
                >{tag}</Link>
              )
            }
          </div>
          <div>
            <span className='font-bold'>{product.discount ? '$' + product.discountedAmount : '$' + product.price}</span>
            <span className='ml-4 line-through text-neutral-4'>{product.discount ? `$${product.price}` : ''}</span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="bg-neutral-2 max-w-28 min-w-28 w-full p-1.5 flex justify-between items-center rounded-full shadow-inner">
              <button className="bg-neutral-1 p-1 shadow-md rounded-full text-neutral-4 hover-scale"><Minus className="hover-scale" size={16} /></button>
              <span className="font-bold text-sm">1</span>
              <button className="bg-neutral-1 p-1 shadow-md rounded-full text-neutral-4 hover-scale"><Plus className="hover-scale" size={16} /></button>
            </div>
            <WishListBtnWithText productId={product.id} />
          </div>
          <AddToCartBtn product={product} />
        </div>
      </section>

      {/* related products */}
      {
        relatedProducts && relatedProducts.length > 0 && <section className="mt-20">
          <div className='flex items-end justify-between mb-12'>
            <h1 className='inline-block leading-8'>Related <span className='block'>Products</span></h1>
            {relatedProducts && relatedProducts.length > 4 && <LinkButton text='See All' href={`/shop?c=${encodeURIComponent(product.category)}`} />}
          </div>
          <Suspense fallback={<div className='product-fallback'>
            {Array.from({ length: 10 }).map((_, index) => <ProductSkeleton key={index} />)}
          </div>}>
            <div className='product-grid px-0'>
              {
                relatedProducts && relatedProducts.length > 0 && relatedProducts.slice(0).map((product) =>
                  <ProductCard key={product.id} {...product} />
                )
              }
            </div>
          </Suspense>
        </section>
      }
    </div>
  );
}
