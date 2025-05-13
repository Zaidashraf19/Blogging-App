import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
// import Footer from './components/footer'

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet />
    </>
  )
}

export default Layout