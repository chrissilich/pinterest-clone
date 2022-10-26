import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

import Search from './views/Search'
import Tagged from './views/Tagged'

import './index.scss'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Search />,
	},
	{
		path: '/search/:term',
		element: <Search />,
	},
	{
		path: '/search',
		element: <Search />,
	},
	{
		path: '/tagged/:tag',
		element: <Tagged />,
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
