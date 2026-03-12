import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { ProductSkeleton } from "@/components/Skeletons";
import {
  getProductsByPriceRange,
  getProductsByCategory,
  getAllProducts,
  getProductsByCategoryAndPriceRange,
} from "@/lib/getProducts";
import { Suspense } from "react";
import Sort from "@/components/Sort";
import Filter from "@/components/Filter";
import { ProductType } from "@/types/types";
import ShopBannerCarousel from "@/components/ShopBannerCarousel";

export const metadata: Metadata = {
  title: "Shop - Browse Our Best Products | Omnishop",
  description:
    "Explore our complete collection of quality products. Find everything you need with our easy-to-use filters, sorting options, and best prices. Shop now at Omnishop.",
  keywords: [
    "shop products",
    "online store",
    "browse products",
    "discount items",
    "best deals",
    "product catalog",
  ],
  openGraph: {
    title: "Shop - Browse Our Best Products | Omnishop",
    description:
      "Explore our complete collection of quality products with filters and sorting options.",
    url: "https://omnishop-ng.vercel.app/shop",
    type: "website",
    images: [
      {
        url: "./../../../../../public/images/clothes1.webp",
        width: 1200,
        height: 630,
        alt: "Omnishop Product Shop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop - Browse Our Best Products | Omnishop",
    description:
      "Explore our complete collection of quality products with filters and sorting options.",
    images: ["/images/og-shop.jpg"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://omnishop-ng.vercel.app/shop",
  },
};

const sortProducts = (
  products: ProductType[],
  sortOrder?: string,
): ProductType[] => {
  if (!sortOrder) return products;
  return products.sort((a, b) =>
    sortOrder === "low"
      ? a.discountedAmount - b.discountedAmount
      : b.discountedAmount - a.discountedAmount,
  );
};

const ShopPage = async ({
  searchParams,
}: {
  searchParams: { c: string; min: string; max: string; sort: string };
}) => {
  const { c, min, max, sort } = await searchParams;

  let productsData: ProductType[];

  if (c && min && max) {
    productsData = await getProductsByCategoryAndPriceRange(c, min, max);
  } else if (c && !min && !max) {
    productsData = await getProductsByCategory(c);
  } else if (min && max && !c) {
    productsData = await getProductsByPriceRange(min, max);
  } else {
    productsData = await getAllProducts();
  }

  const products = sortProducts(productsData, sort);

  return (
    <>
      {/* banner image */}
      <ShopBannerCarousel />

      {/* filter, sort and category-title */}

      <div className="container flex flex-col md:flex-row mt-8 mb-18">
        <div className="sticky top-14 z-40">
          <div className="md:min-w-[16rem] md:max-w-[16rem] w-full sticky top-14 z-40 bg-neutral-1 mr-4 ">
            <Filter category={c} min={min} max={max} sort={sort} />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between sticky top-32 md:top-14 pt-6 pb-3 z-30 bg-neutral-1">
            <h3 className="capitalize">
              {c ? c : "All Products"}{" "}
              {min && max ? ` ($${min} - $${max})` : "(All Prices)"}
            </h3>
            <Sort category={c} min={min} max={max} sort={sort} />
          </div>

          {/* product grid */}
          <Suspense
            fallback={
              <div className="product-fallback mt-6">
                {Array.from({ length: 15 }).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            }
          >
            <div className="product-grid mt-6">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))
              ) : (
                <p className="py-32 col-span-full place-content-center w-full h-full text-center">
                  No product found !
                </p>
              )}
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
