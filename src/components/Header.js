import React from 'react'
import Navigation from './Navigation'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {
  return (
    <header className="main-header">
      <Navigation />
      <LanguageSwitcher />
    </header>
  )
}

export default Header
