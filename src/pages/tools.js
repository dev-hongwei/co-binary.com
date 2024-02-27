import React from 'react'
import { graphql } from 'gatsby'
import { Trans } from 'gatsby-plugin-react-i18next'
import { SEO } from '../components/SEO'
import Layout from '../components/Layout'

const Tools = () => {
  return (
    <Layout>
      <p>
        <Trans>building-page-placeholder</Trans>
      </p>
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

export default Tools

export const Head = ({ data }) => {
  const dataLanguage = data.locales.edges.find((e) => e.node.ns === 'index')
    ?.node.data
  const parsedDataLanguage = JSON.parse(dataLanguage)
  const title = `${parsedDataLanguage['nav-tools']}`
  return <SEO title={title} />
}
