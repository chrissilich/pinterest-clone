import { Link } from 'react-router-dom'

function Welcome() {
	return (
		<div className="Welcome">
			<section className="welcome">
				{/* <h1>Welcome to Taggr</h1> */}
				<h2>What is Taggr?</h2>
				<p>
					It's an app for when you're researching the visual style of something.
					Sort of like a simpler clone of Pinterest, but using google image
					search, and much faster to work with.
				</p>
				<p>
					And it has a cool web 2.0 name. Are we still doing cool web 2.0 names?
					Remember when Twitter was called Twttr?
				</p>
				<h2>How do I use it?</h2>
				<p>
					Log in with Google account. Don't worry, I'm just using Firebase to
					store your activity on this app. I can't see anything else.
				</p>
				<p>
					Do a search in the bar above. If you're just trying this out, I
					suggest "modern fireplace" and imagine you're researching for your
					next big home renovation project.
				</p>
				<p>
					Add a tag or two at the bottom of the screen. Maybe "mantle", "tile"
					or any other way you might categorize your findings.
				</p>
				<p>
					Scroll through the results, find something you like, hover over it and
					press the number key on your keyboard that corresponds with the tag
					you want to tag it with.
				</p>
				<p>
					Once you're done tagging click on one of the tags to see everything
					you applied it to.
				</p>
				<h2>Why?</h2>
				<p>
					I thought it would be cool and useful? But also because I wanted to
					show off my React skills.
				</p>
				<h2>Who?</h2>
				<p>
					This app was design and built by Chris Silich.
					<br />
					<a href="https://chrissilich.com" target="_blank">
						chrissilich.com
					</a>
				</p>
			</section>
		</div>
	)
}

export default Welcome
