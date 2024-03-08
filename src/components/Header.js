import React, { useState } from 'react'
import Navigation from './Navigation'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {
  const [langSwitcherWidth, setLangSwitcherWidth] = useState(0)

  const handleLangSwitcherWidthChange = (newWidth) => {
    setLangSwitcherWidth(newWidth)
  }
  return (
    <header className="main-header">
      <div className="main-header-container">
        <Navigation otherComponentsWidth={langSwitcherWidth} />
        <LanguageSwitcher onWidthChange={handleLangSwitcherWidthChange} />
      </div>
    </header>
  )
}

export default Header
