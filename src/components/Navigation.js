import React from 'react'
import { Link } from 'gatsby'
import { Trans } from 'gatsby-plugin-react-i18next'

const NavigationItems = ['home', 'blogs', 'tools', 'about']
const Navigation = () => {
  return (
    <ul>
      {NavigationItems.map((navItem) => {
        return (
          <li key={navItem}>
            <Link to={navItem}>
              <Trans>{`nav-${navItem}`}</Trans>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Navigation
