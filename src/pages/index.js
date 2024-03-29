import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/Layout'
import Heading from '../components/Heading'
import BlogList from '../components/BlogList'
import { SEO } from '../components/SEO'
import { getI18nContent, getSimplifiedPosts } from '../utils/helper'

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const { t } = useTranslation()
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(edges), [edges])
  return (
    <Layout>
      <div>
        <h2>{t('home-page-welcome-title')}</h2>
        <p>{t('home-page-welcome-detail')}</p>
      </div>
      <div>
        <Heading title="home-heading-posts" slug="/blog" />
        <BlogList data={simplifiedPosts} showFullDate />
      </div>
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
    allMarkdownRemark(
      filter: {
        fields: { category: { eq: "post" }, locale: { eq: $language } }
      }
      sort: { frontmatter: { date: DESC } }
      limit: 5
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
`

export default IndexPage

export const Head = ({ data }) => {
  const title = getI18nContent(data, 'nav-home')
  return <SEO title={title} />
}
