import React, { useState, useEffect } from 'react'

const usePosts = () => {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		// fetch('https://api/posts').then(async (response) => {
		// 	if (response.ok) setPosts(await response.json())
		// })
		setPosts([
			{ id: 0, text: 'hello' },
			{ id: 1, text: 'world' },
			{ id: 2, text: 'fake data' },
		])
	}, [])

	return posts
}

export default usePosts
