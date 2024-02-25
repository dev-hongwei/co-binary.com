import React, { useState, useEffect, useRef } from 'react'
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
  {
    id: 'nav-about1',
    path: 'about',
  },
  {
    id: 'nav-about2',
    path: 'about',
  },
  {
    id: 'nav-about3',
    path: 'about',
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
  const navMoreReseveWidth = 85

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
    console.log('Set navigation items width')
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

    let addedItemWidth = 0
    const BreakException = {}
    try {
      navigationItems.forEach((navItem, index) => {
        addedItemWidth += navItem.width
        if (
          addedItemWidth > navbarWidth - navMoreReseveWidth ||
          (index + 1 == navigationItems.length && addedItemWidth > navbarWidth)
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
