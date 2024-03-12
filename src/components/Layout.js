import React from 'react'
import Header from './Header'
import Footer from './Footer'

import '../styles/style.css'
import '../styles/github-markdown-light.css'

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
