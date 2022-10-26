import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { auth, promptSignIn, promptSignOut, storeThing } from '../services/firebase'

import SearchField from './SearchField'

function Header(props) {
	const [user, setUser] = useState(null)

	useEffect(() => {
		let unsubscribe = auth.onAuthStateChanged((user) => {
			console.log('auth state changed')
			setUser(user)
			// console.log(user)
		})
		return unsubscribe
	}, [])

	const submitSearchTerm = async (searchTerm) => {
		props.submitSearchTerm(searchTerm)
	}

	return (
		<header>
			<h1>
				<Link to="/">Taggr</Link>
			</h1>

			<SearchField submitSearchTerm={submitSearchTerm} />

			<div className="auth">
				{user ? (
					<p>
						Welcome {user.displayName} <br />
						<button className="btn btn-primary" onClick={promptSignOut}>
							Sign out
						</button>
					</p>
				) : (
					<button className="btn btn-primary" onClick={promptSignIn}>
						Sign in with Google
					</button>
				)}
			</div>
		</header>
	)
}

export default Header
