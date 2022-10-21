import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

function Result(props) {
	const liRef = useRef()

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from('div', {
				opacity: 0,
				y: 60,
				delay: 0.5 + Math.random() * 0.75,
				duration: 0.5,
			})
		}, liRef) // <- Scope!
		return () => ctx.revert()
	}, [])

	return (
		<li ref={liRef} onMouseEnter={props.onSelect} className={props.selectedImage === props.index ? 'selected' : ''}>
			<div>
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
			</div>
		</li>
	)
}

export default Result
