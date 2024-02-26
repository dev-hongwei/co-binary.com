import React, { useEffect, useRef } from 'react'
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next'
import LanugageDictionary from '../common/LanguageDictionary'

const LanguageSwitcher = ({ onWidthChange }) => {
  const { languages, originalPath, i18n } = useI18next()
  const { t } = useTranslation()
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      const newWidth = ref.current.offsetWidth
      onWidthChange(newWidth)
    }
  }, [onWidthChange])

  return (
    <ul ref={ref} className="nav language-switcher">
      <li className="nav-item">
        <a href="#">
          <img src="/images/globe.svg" alt={t(`nav-more`)} />
        </a>
        <div className="sub-nav-container">
          <ul className="sub-nav">
            {languages.map((lng) => {
              return (
                <li key={lng} className="sub-nav-item">
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
        </div>
      </li>
    </ul>
  )
}

export default LanguageSwitcher
