'use client'

import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const SearchBar = () => {

    const router = useRouter()

    const [query, setQuery] = useState('')

    useEffect(() => {
        const fecthSearch = () => {
            query && router.push(`/search?q=${query}`)
        }
        fecthSearch();
    }, [query])

    return (
        <form onSubmit={(e) => e.preventDefault()} className='border border-border text-neutral-4 p-3 rounded-full flex items-center gap-3 max-w-lg mx-auto font-inter'>
            <Search />
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setQuery(e.target.value);
                }}
                value={query}
                type="text"
                placeholder='Search anything here . . .'
                className='outline-0 grow'
                id='searchform'
            />

            <button onClick={() => {
                setQuery('')
            }}
                className={`${query ? 'block' : 'hidden'}`}><X size={18} /></button>

        </form>
    )
}

export default SearchBar
