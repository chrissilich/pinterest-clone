import { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { auth, getTaggedStuff, getTagById } from '../services/firebase'

import Header from '../components/Header'
import TaggedItem from '../components/TaggedItem'

function Tagged(params) {
	const [user, setUser] = useState(null)
	const [tag, setTag] = useState(null)
	const [tagged, setTagged] = useState(null)

	const urlParams = useParams()
	// console.log()

	useEffect(() => {
		let unsubscribe = auth.onAuthStateChanged((user) => {
			console.log('auth state changed, Tag.jsx')
			setUser(user)
		})
		return unsubscribe
	}, [])

	useEffect(() => {
		if (!user) return
		console.log('get tag data', urlParams.tag)
		getTaggedStuff(urlParams.tag).then((tagged) => {
			console.log(tagged)
			setTagged([...tagged])
		})
		getTagById(urlParams.tag).then((tag) => {
			console.log(tag)
			setTag(tag)
		})
	}, [user, urlParams])

	return (
		<div>
			<Header />

			<section className="tagged">
				<h2>
					Images tagged with "<em>{tag && tag[0].text}</em>"
				</h2>
				<ul>
					{tagged &&
						tagged.length &&
						tagged.map((tag, i) => {
							return <TaggedItem key={tag.id} data={tag} index={i + 1} />
						})}
				</ul>
			</section>
		</div>
	)
}

export default Tagged
