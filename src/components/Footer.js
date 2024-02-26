import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="main-footer">
      <ul className="nav">
        <li className="nav-item">
          <i>{t(`footer-github-info`)}</i>
          <a
            href="https://github.com/dev-hongwei/co-binary.com"
            target="_blank"
            rel="noreferrer"
          >
            <img src={`../images/github.svg`} alt="GitHub" />
          </a>
        </li>
        <li className="nav-item">
          <i>{t(`footer-gatsby-info`)}</i>
          <a href="https://www.gatsbyjs.com" target="_blank" rel="noreferrer">
            <img src={`../images/gatsbyjs.svg`} alt="Gatsby" />
          </a>
        </li>
        <li className="nav-item">
          <i>{t(`footer-netlify-info`)}</i>
          <a href="https://www.netlify.com" target="_blank" rel="noreferrer">
            <img src={`../images/netlify.svg`} alt="Netlify" />
          </a>
        </li>
      </ul>
      <p>© 2024 Co-Binary</p>
    </footer>
  )
}

export default Footer
