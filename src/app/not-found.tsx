'use client';

import { useRouter } from "next/navigation";

const NotFoundPage = () => {
    const router = useRouter();
    return (
        <div className='grid w-full h-screen place-content-center text-3xl'>
            <div className="flex flex-col items-center gap-4">
                Page Not Found !!! <button className="font-bold px-3 py-1 text-neutral-1 rounded-full bg-neutral-4 text-base" onClick={router.back}>Go Back !</button>
            </div>
        </div>
    )
}

export default NotFoundPage
