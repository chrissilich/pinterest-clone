import { useState, useEffect, useMemo } from 'react'
import { search } from './services/google-search'
import { storeThing, storeTaggedImage, storeTag, getTags, auth } from './services/firebase'

import Header from './components/Header'
import Search from './components/Search'
import Result from './components/Result'
import Tag from './components/Tag'

import './App.scss'

function App() {
	// storeThing('chris', 'silich')

	const [user, setUser] = useState(null)
	const [tags, setTags] = useState([])
	const [newTag, setNewTag] = useState('')
	const [results, setResults] = useState([])

	// most recent query
	let pageNumber = 0
	let recentSearchTerm = ''

	// selections
	const [selectedImage, setSelectedImage] = useState(-1)

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			console.log('auth state changed')
			setUser(user)
			getTags().then((tags) => {
				setTags(tags)
			})
		})
	}, [])

	useEffect(() => {
		window.addEventListener('keyup', tagSomething)
		return () => {
			window.removeEventListener('keyup', tagSomething)
		}
	}, [])

	const tagSomething = async (e) => {
		let parsedKey = parseInt(e.key)
		console.log('tagSomething', parsedKey, tags.length)
		if (parsedKey <= tags.length) {
			storeTaggedImage(tags[parsedKey - 1].id, results[selectedImage].link)
		}
	}

	const submitSearchTerm = async (term) => {
		if (term == recentSearchTerm) {
			console.warn("don't search for the same thing again!")
			return
		}
		recentSearchTerm = term
		pageNumber = 0 // reset page number to 0
		let results = await search(term, pageNumber)
		setResults(results)
	}

	const submitNewTag = (event) => {
		if (event.key === 'Enter') {
			// TODO check if new tag is a dupe of old tag
			storeTag(newTag).then((res) => {
				console.log('stored a tag?', res)
				getTags().then((tags) => {
					setTags(tags)
				})
			})
		}
	}

	return (
		<div className="App">
			<Header />

			<Search submitSearchTerm={submitSearchTerm} />

			<section className="results">
				<ul>
					{results &&
						results.length &&
						results.map((result, i) => (
							<Result
								onSelect={() => setSelectedImage(i)}
								selectedImage={selectedImage}
								index={i}
								key={result.link}
								data={result}
							/>
						))}
				</ul>
			</section>

			<section className="tags">
				<ul>
					<li className="plus">
						<input
							onChange={(event) => setNewTag(event.target.value)}
							onKeyDown={submitNewTag}
							placeholder="new tag..."
						/>
					</li>
					{tags &&
						tags.length &&
						tags.map((tag, i) => {
							return <Tag key={tag.id} data={tag} index={i + 1} />
						})}
				</ul>
			</section>
		</div>
	)
}

export default App
