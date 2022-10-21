import { useState } from 'react'

function Search(props) {
	const [searchTerm, setSearchTerm] = useState('')

	const submitSearchTerm = async (event) => {
		if (event.key === 'Enter') {
			props.submitSearchTerm(searchTerm)
			event.target.blur()
		}
	}

	return (
		<div className="search">
			<input
				onChange={(event) => setSearchTerm(event.target.value)}
				onKeyDown={submitSearchTerm}
				id="search-term"
				name="search-term"
				placeholder="Search term..."
			></input>
		</div>
	)
}

export default Search
