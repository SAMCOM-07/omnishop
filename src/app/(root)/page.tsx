import Guarantee from "@/components/Guarantee";
import Main from "@/components/Main";
import NewArrivals from "@/components/NewArrivals";
import Newsletter from "@/components/Newsletter";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Suspense } from "react";


export default function Home() {

  return (
    <div className="space-y-20">
      <Main />
      <div className='container space-y-20'>
        <Suspense fallback={<div className='mt-12 flex items-start overflow-x-auto gap-6'>
          {Array.from({ length: 10 }).map((_, index) =>
            <div key={index} className='w-full min-w-[250px] max-w-[250px]'><ProductSkeleton /></div>
          )}
        </div>}>
          <NewArrivals />
        </Suspense>
        <Guarantee />
      </div>
      <Newsletter />
    </div>
  )
}
