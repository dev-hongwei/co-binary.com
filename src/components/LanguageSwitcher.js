import React, { useEffect, useRef } from 'react'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'
import LanugageDictionary from '../common/LanguageDictionary'

const LanguageSwitcher = ({ onWidthChange }) => {
  const { languages, originalPath, i18n } = useI18next()
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      const newWidth = ref.current.offsetWidth
      onWidthChange(newWidth)
    }
  }, [onWidthChange])

  return (
    <ul ref={ref} className="language-switcher">
      {languages.map((lng) => {
        return (
          <li key={lng}>
            <Link
              to={originalPath}
              language={lng}
              style={{
                display: i18n.resolvedLanguage === lng ? 'none' : 'block',
              }}
            >
              {LanugageDictionary[lng]}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default LanguageSwitcher
