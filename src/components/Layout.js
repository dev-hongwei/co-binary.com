import React from 'react'
import Header from './Header'

import '../styles/style.css'

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}

export default Layout
