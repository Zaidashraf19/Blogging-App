import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Register from './pages/register.jsx'
import Feed from './pages/feed.jsx'
import Login from './pages/login.jsx'
import Addpost from './pages/addpost.jsx'

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'login/register',
        element: <Register />
      },
      {
        path: '',
        element: <Feed />
      },
      {
        path: 'addpost',
        element: <Addpost />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)