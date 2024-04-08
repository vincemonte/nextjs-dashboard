'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); //gathering parameters of the current URL 
  const pathname = usePathname(); //gathering the current URL path
  const { replace } = useRouter(); //gathering the router object to manipulate the URL


  // function handleSearch(term:string) { we've replaced this function with a debounced version below
    const handleSearch = useDebouncedCallback((term: string) => {
    const params= new URLSearchParams(searchParams); //setting up the object we'll use to manipulate the URL 
    if (term) {
      params.set('query', term); //setting the query parameter to the search term
    }else{
      params.delete('query'); //removing the query parameter if the search term is empty
    }
    replace(`${pathname}?${params.toString()}`); //updating the URL with the new query parameter
  }, 300); //debouncing the function to prevent it from firing too frequently
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()} //if the query parameter is present, set the input value to it
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
