import React from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

const Heading = ({ title, slug }) => {
  const { t } = useTranslation()
  return (
    <h3 className="home-heading">
      <div className="title">{t(title)}</div>
      {slug && (
        <Link className="button" to={slug}>
          {t('home-heading-view-all')}
        </Link>
      )}
    </h3>
  )
}

export default Heading
