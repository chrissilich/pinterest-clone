import React from 'react'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Welcome from './Welcome'
import Home from './Home'
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
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
