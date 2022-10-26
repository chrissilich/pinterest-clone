import { Link } from 'react-router-dom'

import Header from '../components/Header'

function Welcome() {
	return (
		<div className="Welcome">
			{/* <Header submitSearchTerm={submitSearchTerm} /> */}

			<section className="welcome">
				<h1>Welcome to Taggr</h1>
				<h2>What's this?</h2>
				<p>
					It's an app for when you're researching the visual style of something.
					Sort of like Pinterest, but using google image search, and much
					faster.
				</p>
				<h2>How do I use it?</h2>
				<p>
					On the next page, do a search. If you're just trying this out, I
					suggest "modern fireplace" and imagine you're researching for your
					next big home renovation project.
				</p>
				<p>
					Then add a tag or two at the bottom of the screen. Maybe "mantle",
					"tile" or any other way you might categorize your findings.
				</p>
				<p>
					Now this is the part that makes this so much faster than Pinterest.
					Scroll through the results, and if you like something, hover over it
					and press the number key on your keyboard that corresponds with the
					tag you want to tag it with.
				</p>
				<p>
					And of course, after you're done, click on one of the tags to see
					everything you applied it to
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
				<p className="go">
					<Link to="/search">Go →</Link>
				</p>
			</section>
		</div>
	)
}

export default Welcome
