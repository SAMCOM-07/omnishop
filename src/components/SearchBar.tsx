'use client'

import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const SearchBar = ({ q }: { q: string }) => {

    const router = useRouter()

    const [query, setQuery] = useState('')

    useEffect(() => {
        const fecthSearch = () => {
            query && router.push(`/search?q=${query}`);
        }
        fecthSearch();
    }, [query, q])

    return (
        <div className='border border-border text-neutral-4 p-3 rounded-full flex items-center gap-3 font-inter'>
            <Search />
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setQuery(e.target.value);
                }}
                value={query}
                type="text"
                placeholder='Search . . .'
                className='outline-0 grow'
            />

            <button onClick={() => {
                setQuery('');
                router.push('/search')
            }}
                className={`${query ? 'block' : 'hidden'}`}><X size={18} /></button>

        </div>
    )
}

export default SearchBar
