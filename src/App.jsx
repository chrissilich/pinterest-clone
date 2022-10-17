import { useState, useEffect, useMemo } from 'react'

import { search } from './services/google-search'
import { storeThing, getTags, auth } from './services/firebase'
import Header from './components/Header'
import Result from './components/Result'
import Tag from './components/Tag'

import './App.scss'

function App() {
	// storeThing('chris', 'silich')

	const [user, setUser] = useState(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [tags, setTags] = useState([])
	const [results, setResults] = useState([])

	// most recent query
	let pageNumber = 0
	let recentSearchTerm = ''

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			console.log('auth state changed')
			setUser(user)
			getTags().then((tags) => {
				setTags(tags)
			})
		})
	}, [])

	const searchTermKeyPress = async (event) => {
		if (event.key === 'Enter') {
			if (searchTerm == recentSearchTerm) {
				console.warn("don't search for the same thing again!")
				return
			}
			recentSearchTerm = searchTerm
			pageNumber = 0 // reset page number to 0
			let results = await search(searchTerm, pageNumber)
			setResults(results)
		}
	}

	return (
		<div className="App">
			<Header />

			<section className="search">
				<input
					onChange={(event) => setSearchTerm(event.target.value)}
					onKeyDown={searchTermKeyPress}
					id="search-term"
					name="search-term"
					placeholder="Search term..."
				></input>
			</section>

			<section className="results">
				<ul>
					{results && results.length && results.map((result) => <Result key={result.link} data={result} />)}
				</ul>
			</section>

			<section className="tags">
				<ul>
					{tags &&
						tags.length &&
						tags.map((tag) => {
							return <Tag key={tag.id} data={tag} />
						})}
				</ul>
			</section>
		</div>
	)
}

export default App
