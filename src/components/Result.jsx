// import { useState, useEffect, useMemo } from 'react'

// import { auth, promptSignIn, promptSignOut, storeThing } from '../services/firebase'
// import './Result.scss'

function Result(props) {
	return (
		<li onMouseEnter={props.onSelect} className={props.selectedImage === props.index ? 'selected' : ''}>
			<img src={props.data.link} />
			<h3>{props.data.snippet}</h3>
			<h4>{props.data.displayLink}</h4>
			<p>
				<a target="_blank" href={props.data.image.contextLink}>
					Visit source page
				</a>{' '}
				<a target="_blank" href={props.data.link}>
					View image directly
				</a>
			</p>
		</li>
	)
}

export default Result
