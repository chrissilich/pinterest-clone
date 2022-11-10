import { useState, useEffect, useMemo } from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'

import { useBottomScrollListener } from 'react-bottom-scroll-listener'

import { search } from '../services/google-search'
import { storeTaggedImage, storeTag, getTags, auth } from '../services/firebase'

import Welcome from '../components/Welcome'
import Header from '../components/Header'
import Result from '../components/Result'
import Tag from '../components/Tag'

import LoaderImage from '../assets/loader.svg'

function Search() {
	const [user, setUser] = useState(null)
	const [tags, setTags] = useState([])
	const [newTag, setNewTag] = useState('')
	const [results, setResults] = useState(null)
	const [pageNumber, setPageNumber] = useState(null)

	const urlParams = useParams()

	// selections
	const [selectedImage, setSelectedImage] = useState(-1)

	useEffect(() => {
		let unsubscribe = auth.onAuthStateChanged((user) => {
			// console.log('auth state changed, App.jsx')
			setUser(user)
			getTags().then((tags) => {
				// console.log('got tags, App.jsx')
				tags.map((tag) => (tag.active = false))
				setTags(tags)
			})
		})

		return unsubscribe
	}, [])

	useEffect(() => {
		window.addEventListener('keyup', tagSomething)
		return () => {
			window.removeEventListener('keyup', tagSomething)
		}
	}, [tags, results, selectedImage])

	const tagSomething = async function (e) {
		// console.warn('current state of tags', tags)
		// console.warn('current state of results', results)
		let parsedKey = parseInt(e.key)
		// console.log('tagSomething', parsedKey, selectedImage)
		if (
			parsedKey &&
			parsedKey >= 0 &&
			parsedKey <= tags.length &&
			!isNaN(selectedImage)
		) {
			let imageData = {
				snippet: results[selectedImage].snippet,
				displayLink: results[selectedImage].displayLink,
				contextLink: results[selectedImage].image.contextLink,
				link: results[selectedImage].link,
			}
			storeTaggedImage(tags[parsedKey - 1].id, imageData)
			tags[parsedKey - 1].active = true
			// console.log('modified tag state', tags[parsedKey - 1])
			setTags([...tags])
			setTimeout(() => {
				tags[parsedKey - 1].active = false
				setTags([...tags])
			}, 600)
		} else {
			console.warn('couldnt tag!')
		}
	}

	useEffect(() => {
		submitSearchTerm()
	}, [urlParams])

	useBottomScrollListener(
		() => {
			getMoreSearchResults()
		},
		{
			debounce: true,
		}
	)

	let submitSearchTerm = async () => {
		if (!urlParams.term) {
			console.log('search page with no term')
			return
		}
		console.log('search page with term', urlParams.term)

		setPageNumber(0) // reset page number to 0
		setResults([])
		let newResults = await search(urlParams.term, pageNumber)
		setResults(newResults)
	}

	let getMoreSearchResults = async () => {
		setPageNumber(pageNumber + 1)
		console.log(
			'search another page with term',
			urlParams.term,
			' page number ',
			pageNumber + 1
		)
		if (pageNumber > 10) {
			console.warn('lets stop at 10 pages')
			return
		}
		let newResults = await search(urlParams.term, pageNumber)
		setResults([...results, ...newResults])
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

			{(!results || results.length == 0) && <Welcome />}

			<section className="results">
				<ul>
					{results &&
						results.length &&
						results.map((result, i) => (
							<Result
								onSelect={() => setSelectedImage(i)}
								selectedImage={selectedImage}
								index={i}
								key={result.key}
								data={result}
							/>
						))}
				</ul>
			</section>

			{results && results.length && (
				<div className="load-more">
					<img src={LoaderImage} />
					<br />
					Loading more results
				</div>
			)}

			{user && (
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
			)}
		</div>
	)
}

export default Search
