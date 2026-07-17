import React from 'react'
import SideBar from './SideBar'
import NavBar from './NavBar'
import Footer from './Footer'
import DashBoard from '../pages/Dashboard/DashBoard'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar />
        {/* Layout container */}
        <div className="layout-page">
          {/* Navbar */}
          <NavBar />
          {/* / Navbar */}
          {/* Content wrapper */}
          <div className="content-wrapper">
            {/* Content */}
            <Outlet />
            {/* / Content */}
            {/* Footer */}
            <Footer />
            {/* / Footer */}
            <div className="content-backdrop fade" />
          </div>
          {/* Content wrapper */}
        </div>
        {/* / Layout page */}
      </div>
      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle" />
    </div>
  )
}

export default DashboardLayout