import { Link } from 'react-router-dom'

function Tag(props) {
	return (
		<li className={props.data.active ? 'active' : ''}>
			<Link to={'/tagged/' + props.data.id}>{props.data.text}</Link>
			<em>[{props.index}]</em>
		</li>
	)
}

export default Tag
