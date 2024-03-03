import React, { useState, useEffect, useRef } from 'react'
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import Threshold from '../common/Threshold'

const navigationItems = [
  {
    id: 'nav-home',
    path: '/',
  },
  {
    id: 'nav-blog',
    path: '/blog',
  },
  {
    id: 'nav-about',
    path: '/about',
  },
]

const Navigation = ({ otherComponentsWidth }) => {
  const { t } = useTranslation()
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  )
  const [showMore, setShowMore] = useState(false)
  const [visibleItems, setVisibleItems] = useState(navigationItems)
  const navItemRefs = useRef([])
  const navMoreReseveWidth = 110

  useEffect(() => {
    // set window width
    if (typeof window === 'undefined') {
      return
    }
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    navItemRefs.current.forEach((navItemRef, index) => {
      if (navItemRef) {
        navigationItems[index].width = navItemRef.offsetWidth
      }
    })
  }, [])

  useEffect(() => {
    // calculate visible navigation items
    let itemsToShow = []
    const navbarWidth = windowWidth - otherComponentsWidth

    if (windowWidth >= Threshold.screenWidth) {
      let addedItemWidth = 0
      const BreakException = {}
      try {
        navigationItems.forEach((navItem, index) => {
          addedItemWidth += navItem.width
          if (
            (index + 1 < navigationItems.length &&
              addedItemWidth > navbarWidth - navMoreReseveWidth) ||
            (index + 1 == navigationItems.length &&
              addedItemWidth > navbarWidth)
          ) {
            throw BreakException
          }
          itemsToShow.push(navigationItems[index])
        })
      } catch (e) {
        if (e !== BreakException) {
          throw e
        }
      }
    }
    setShowMore(itemsToShow.length < navigationItems.length)
    setVisibleItems(itemsToShow)
  }, [windowWidth, otherComponentsWidth])

  return (
    <ul className="nav">
      {visibleItems.map((navItem, index) => {
        return (
          <li
            key={navItem.id}
            className="nav-item"
            ref={(el) => (navItemRefs.current[index] = el)}
          >
            <Link to={navItem.path}>
              <img src={`/images/${navItem.id}.svg`} alt={t(`${navItem.id}`)} />
              <Trans>{`${navItem.id}`}</Trans>
            </Link>
          </li>
        )
      })}
      {showMore && (
        <li className="nav-item nav-item-more">
          {visibleItems.length === 0 && (
            <a href="#">
              <img
                src="/images/nav-hamburger.svg"
                alt={t(`nav-more`)}
                className="nav-hamburger-img"
              />
            </a>
          )}
          {visibleItems.length > 0 && (
            <a href="#">
              {t(`nav-more`)}
              <img src="/images/nav-more.svg" alt={t(`nav-more`)} />
            </a>
          )}
          <div className="sub-nav-container">
            <ul className="sub-nav">
              {navigationItems.slice(visibleItems.length).map((navItem) => {
                return (
                  <li key={navItem.id} className="sub-nav-item">
                    <Link to={navItem.path}>
                      <img
                        className="sub-nav-reverse-img"
                        src={`/images/${navItem.id}-reverse-color.svg`}
                        alt={t(`${navItem.id}`)}
                      />
                      <img
                        className="sub-nav-img"
                        src={`/images/${navItem.id}.svg`}
                        alt={t(`${navItem.id}`)}
                      />
                      <Trans>{`${navItem.id}`}</Trans>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </li>
      )}
    </ul>
  )
}

export default Navigation
