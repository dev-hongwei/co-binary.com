import React from 'react'
import Header from './Header'
import Footer from './Footer'

import '../styles/style.css'

const Layout = ({ children }) => {
  return (
    <div className="whole-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
