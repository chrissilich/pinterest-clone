import { useState, useEffect, useMemo } from 'react'

import { auth, promptSignIn, promptSignOut, storeThing } from '../services/firebase'
// import './Header.scss'

function Header() {
	const [user, setUser] = useState(null)

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			console.log('auth state changed')
			setUser(user)
			// console.log(user)
		})
	}, [])

	return (
		<header>
			<h1>React project thingy</h1>
			{user ? (
				<p>
					Welcome {user.displayName} &nbsp;
					<button className="btn btn-primary" onClick={promptSignOut}>
						Sign out
					</button>
				</p>
			) : (
				<button className="btn btn-primary" onClick={promptSignIn}>
					Sign in with Google
				</button>
			)}
		</header>
	)
}

export default Header
