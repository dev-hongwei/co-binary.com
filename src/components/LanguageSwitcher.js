import React from 'react'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'
import LanugageDictionary from '../common/LanguageDictionary'

const LanguageSwitcher = () => {
  const { languages, originalPath, i18n } = useI18next()
  return (
    <ul className="language-switcher">
      {languages.map((lng) => {
        return (
          <li key={lng}>
            <Link
              to={originalPath}
              language={lng}
              style={{
                textDecoration:
                  i18n.resolvedLanguage === lng ? 'underline' : 'none',
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
