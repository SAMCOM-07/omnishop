import ProductSkeleton from '@/components/ProductSkeleton'


const NewArrivalsLoadingPage = () => {
    return (
        <div className='mt-12 flex items-start overflow-x-auto gap-6'>
            {Array.from({ length: 10 }).map((_, index) =>
                <div key={index} className='w-full min-w-[250px] max-w-[250px]'><ProductSkeleton /></div>
            )}
        </div>
    )
}

export default NewArrivalsLoadingPage
