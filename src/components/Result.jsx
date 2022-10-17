// import { useState, useEffect, useMemo } from 'react'

// import { auth, promptSignIn, promptSignOut, storeThing } from '../services/firebase'
// import './Result.scss'

function Result(props) {
	console.log(props)
	return (
		<li>
			<img src={props.data.link} />
			{props.data.title}
		</li>
	)
}

export default Result
