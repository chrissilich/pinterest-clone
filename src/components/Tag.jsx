// import { useState, useEffect, useMemo } from 'react'

// import { auth, promptSignIn, promptSignOut, storeThing } from '../services/firebase'
// import './Tag.scss'

function Tag(props) {
	// console.log(props)
	return (
		<li className={props.data.active ? 'active' : ''}>
			{props.data.text} <em>[{props.index}]</em>
		</li>
	)
}

export default Tag
