import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchField(props) {
	const [searchTerm, setSearchTerm] = useState('')
	const navigate = useNavigate()

	const submitSearchTerm = async (event) => {
		if (event.key === 'Enter') {
			// props.submitSearchTerm(searchTerm)
			// event.target.blur()
			navigate('/search/' + searchTerm)
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

export default SearchField
