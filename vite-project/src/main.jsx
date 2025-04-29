import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Register from './pages/register'
import Home from './pages/home'
import Login from './pages/login'
import Post from './pages/post'

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
        path: 'home',
        element: <Home /> 
      },
      {
        path: 'home/post',
        element: <Post />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
)