import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Register from './pages/register'
import Feed from './pages/feed'
import Login from './pages/login'
import Addpost from './pages/addpost'

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'feed',
        element: <Feed /> 
      },
      {
        path: 'feed/addpost',
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