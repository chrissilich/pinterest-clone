// import { useState, useEffect, useMemo } from 'react'

// import { auth, promptSignIn, promptSignOut, storeThing } from '../services/firebase'
// import './Result.scss'

function Result(props) {
	return (
		<li onMouseEnter={props.onSelect} className={props.selectedImage === props.index ? 'selected' : ''}>
			<img src={props.data.link} />
			<p>{props.data.title}</p>
		</li>
	)
}

export default Result
