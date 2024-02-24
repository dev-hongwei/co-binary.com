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
      <Navigation otherComponentsWidth={langSwitcherWidth} />
      <LanguageSwitcher onWidthChange={handleLangSwitcherWidthChange} />
    </header>
  )
}

export default Header
