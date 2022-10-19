import { useState } from 'react'

import './Search.scss'

function Search(props) {
	const [searchTerm, setSearchTerm] = useState('')

	const submitSearchTerm = async (event) => {
		if (event.key === 'Enter') {
			props.submitSearchTerm(searchTerm)
		}
	}

	return (
		<section className="search">
			<input
				onChange={(event) => setSearchTerm(event.target.value)}
				onKeyDown={submitSearchTerm}
				id="search-term"
				name="search-term"
				placeholder="Search term..."
			></input>
		</section>
	)
}

export default Search
