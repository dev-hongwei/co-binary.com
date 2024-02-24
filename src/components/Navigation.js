import React, { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'

const navigationItems = [
  {
    id: 'nav-home',
    path: '/',
  },
  {
    id: 'nav-blogs',
    path: 'blogs',
  },
  {
    id: 'nav-about',
    path: 'about',
  },
]

const Navigation = ({ otherComponentsWidth }) => {
  const { t } = useTranslation()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [showMore, setShowMore] = useState(false)
  const [visibleItems, setVisibleItems] = useState([])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    let itemsToShow = navigationItems
    let itemsToHide = []
    const navbarWidth = windowWidth - otherComponentsWidth

    if (navbarWidth < 768) {
      itemsToShow = navigationItems.slice(0, 2)
      itemsToHide = navigationItems.slice(2)
    }
    setShowMore(itemsToHide.length > 0)
    setVisibleItems(itemsToShow)
  }, [windowWidth, otherComponentsWidth])

  return (
    <ul className="nav">
      {visibleItems.map((navItem) => {
        return (
          <li key={navItem.id} className="nav-item">
            <a href={navItem.path}>
              <img
                src={`../images/${navItem.id}.svg`}
                alt={t(`${navItem.id}`)}
              />
              <Trans>{`${navItem.id}`}</Trans>
            </a>
          </li>
        )
      })}
      {showMore && (
        <li className="nav-item more">
          <a href="#">{t(`nav-more`)}</a>
          <ul className="sub-nav">
            {navigationItems.slice(visibleItems.length).map((navItem) => {
              return (
                <li key={navItem.id}>
                  <a href={navItem.path}>
                    <img
                      src={`../images/${navItem.id}.svg`}
                      alt={t(`${navItem.id}`)}
                    />
                    <Trans>{`${navItem.id}`}</Trans>
                  </a>
                </li>
              )
            })}
          </ul>
        </li>
      )}
    </ul>
  )
}

export default Navigation
