import React from 'react'
import { graphql } from 'gatsby'
import { Trans } from 'gatsby-plugin-react-i18next'
import { SEO } from '../components/SEO'
import Layout from '../components/Layout'
import { getI18nContent } from '../utils/helper'

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
    locales: allLocale(filter: { language: { eq: $language } }) {
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
  const title = getI18nContent(data, 'nav-tools')
  return <SEO title={title} />
}
