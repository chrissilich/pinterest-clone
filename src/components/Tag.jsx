import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'

function Tag(props) {
	return (
		<>
			<li
				className={props.data.active ? 'active' : ''}
				data-tip={
					'<p>Hover over an image above and press the ' +
					props.index +
					' key to tag it with this tag.</p><p>Click here to see images with this tag.</p>'
				}
			>
				<Link to={'/tagged/' + props.data.id}>{props.data.text}</Link>
				<em>[{props.index}]</em>
			</li>
			<ReactTooltip html={true} className="tooltip" />
		</>
	)
}

export default Tag
