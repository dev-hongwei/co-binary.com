import * as React from 'react'
import { graphql } from 'gatsby'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/Layout'

const IndexPage = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <p>
        <Trans>homePage</Trans>
      </p>
      <p>{t('homePage')}</p>
    </Layout>
  )
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["index"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`

export default IndexPage

export const Head = () => <title>Home Page</title>
