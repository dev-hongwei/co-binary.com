import React from 'react'
import LanguageSwitcher from './LanguageSwitcher'

const Header = ({ siteTitle }) => {
  return (
    <header className="main-header">
      <p>{siteTitle}</p>
      <LanguageSwitcher />
    </header>
  )
}

export default Header
