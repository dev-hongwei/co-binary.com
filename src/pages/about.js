import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from '../components/SEO'
import Layout from '../components/Layout'
import { getI18nContent } from '../utils/helper'

const About = ({
  data: {
    markdownRemark: { html },
  },
}) => {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: html }} />
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
    markdownRemark(
      frontmatter: { slug: { eq: "/about" } }
      fields: { locale: { eq: $language } }
    ) {
      html
    }
  }
`

export default About

export const Head = ({ data }) => {
  const title = getI18nContent(data, 'nav-about')
  return <SEO title={title} />
}
