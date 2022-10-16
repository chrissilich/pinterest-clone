import { useState, useEffect, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import usePosts from './services/usePosts'
import './App.css'

function Post(props) {
	return <li>{props.post.text}</li>
}

function App() {
	const posts = usePosts()

	return (
		<div className="App">
			{posts.map((post) => (
				<Post post={post} />
			))}
		</div>
	)
}

export default App
