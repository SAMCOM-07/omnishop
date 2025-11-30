'use client'

import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SearchBar = () => {

  const router = useRouter()

  const [query, setQuery] = useState('')

  return (
    <section className='flex items-center gap-4'>
      <div className='flex text-neutral-4/70 items-center gap-2 bg-neutral-2 shadow-inner shadow-neutral-4 px-3 py-2 rounded-full font-inter grow'>
        <Search size={20}/>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
          }}

          onKeyDown={(e) => {
            if (e.key === 'Enter') router.push(`/search?q=${query}`);
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
      <button
      onClick={() => router.replace('/')}
      className='font-inter hover-scale text-neutral-4 bg-neutral-2 shadow-[0_0_10px_inset] rounded-full px-3 py-1'
        >Cancel</button>
    </section>
  )
}

export default SearchBar
