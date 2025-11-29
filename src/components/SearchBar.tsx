'use client'

import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const SearchBar = ({ q }: { q: string }) => {

    const router = useRouter()

    const [query, setQuery] = useState('')

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (!query.trim()) {
            params.delete("q"); // <-- important fix
        } else {
            params.set("q", query);
        }

        const newQuery = params.toString();

        router.push(`/search?${newQuery}`);
    }, [query]);


    return (
        <div className='border border-border text-neutral-4 p-3 rounded-full flex items-center gap-3 font-inter'>
            <Search />
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setQuery(e.target.value);
                }}
                value={q ? q : query}
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
