import * as React from 'react'
import { graphql } from 'gatsby'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/Layout'
import { SEO } from '../components/SEO'

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

export const Head = ({ data }) => {
  const dataLanguage = data.locales.edges.find((e) => e.node.ns === 'index')
    ?.node.data
  const parsedDataLanguage = JSON.parse(dataLanguage)
  const title = `${parsedDataLanguage['nav-home']}`

  return <SEO title={title} />
}
