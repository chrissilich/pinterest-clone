import { useState, useEffect, useMemo } from 'react'

import { auth, promptSignIn, promptSignOut, storeThing } from '../services/firebase'
import './Header.scss'

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
			{user ? (
				<p>
					Welcome {user.displayName}
					{
						// <div className="user-image-wrap">
						// 	<img src={user.photoURL} />
						// </div>
					}
					<button onClick={promptSignOut}>Sign out</button>
				</p>
			) : (
				<button onClick={promptSignIn}>Sign in with Google</button>
			)}
		</header>
	)
}

export default Header
