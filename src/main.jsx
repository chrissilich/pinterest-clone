import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

import Welcome from './views/Welcome'
import Home from './views/Home'
import Tagged from './views/Tagged'

import './index.scss'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Welcome />,
	},
	{
		path: '/home',
		element: <Home />,
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
