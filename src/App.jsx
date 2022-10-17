import { useState, useEffect, useMemo } from 'react'

import usePosts from './services/usePosts'
import { storeThing } from './services/firebase'
import Header from './components/Header'
import './App.scss'

function Post(props) {
	return <li>{props.post.text}</li>
}

function App() {
	const posts = usePosts()

	// storeThing('chris', 'silich')

	return (
		<div className="App">
			<Header />

			{posts.map((post, i) => (
				<Post key={i} post={post} />
			))}
		</div>
	)
}

export default App
