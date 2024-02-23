import React from 'react'
import { Link } from 'gatsby'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'

const NavigationItems = ['home', 'blogs', 'tools', 'about']
const Navigation = () => {
  const { t } = useTranslation()
  return (
    <ul className='nav-container'>
      {NavigationItems.map((navItem) => {
        return (
          <li key={navItem}>
            <Link to={navItem}>
              {/* <img src={`../images/${navItem}.svg`} alt={t(`nav-${navItem}`)} /> */}
              <Trans>{`nav-${navItem}`}</Trans>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Navigation
