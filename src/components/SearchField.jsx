import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import TextPlugin from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin)

function SearchField(props) {
	const [searchTerm, setSearchTerm] = useState('')
	const navigate = useNavigate()

	const searchFieldParentRef = useRef()

	const placeholders = [
		'modern fireplace',
		'bauhaus posters',
		'memphis typefaces',
		'art deco colors',
		'Search term...',
	]

	useEffect(() => {
		let ctx
		let intervalID = setInterval(() => {
			let span = searchFieldParentRef.current.querySelector('span')
			let input = searchFieldParentRef.current.querySelector('input')

			ctx = gsap.context(() => {
				gsap.to(span, {
					text: '',
					duration: 0.3,
					onUpdate: () => {
						input.placeholder = span.innerText
					},
				})
				gsap.to(span, {
					text: placeholders[0],
					delay: 0.3,
					duration: 0.8,
					onUpdate: () => {
						input.placeholder = span.innerText
					},
				})
				placeholders.push(placeholders.shift())
			}, searchFieldParentRef) // <- Scope!
		}, 3500)

		return () => {
			clearInterval(intervalID)
			if (ctx) ctx.revert()
		}
	}, [])

	const submitSearchTerm = async (event) => {
		if (event.key === 'Enter') {
			// props.submitSearchTerm(searchTerm)
			// event.target.blur()
			navigate('/search/' + searchTerm)
		}
	}

	return (
		<div className="search" ref={searchFieldParentRef}>
			<span hidden>Search term...</span>
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
