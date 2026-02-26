import React from 'react'

const Search = ({search, setSearch}) => {
    return (
        <div className="w-full bg-light/15 max-w-4xl px-4 py-3 mt-4 mx-auto rounded-lg flex gap-4">
            <img src="./search.svg" className="h-6" alt="search" />
            <input type="text" value={search} placeholder="What should we train today?" className="text-light/70 w-full outline-hidden" onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}

export default Search;