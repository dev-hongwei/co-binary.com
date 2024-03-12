import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from '../components/SEO'
import Layout from '../components/Layout'
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next'
import { getFormattedDate } from '../utils/helper'

const Post = ({ data }) => {
  const post = data.markdownRemark
  const { title, date } = post.frontmatter
  const { previousSlug, nextSlug } = post.fields
  const { i18n } = useI18next()
  const { t } = useTranslation()
  const formattedDate = getFormattedDate(date, i18n.resolvedLanguage, true)
  return (
    <Layout>
      <h2>{title}</h2>
      <i className="post-info">
        {t('post-update-date')} {formattedDate}
      </i>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <div className="post-nav">
        {previousSlug && (
          <Link className="button" to={previousSlug}>
            {t('post-previous')}
          </Link>
        )}
        <span></span>
        {nextSlug && (
          <Link className="button" to={nextSlug}>
            {t('post-next')}
          </Link>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($category: String!, $slug: String!, $language: String!) {
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
      fields: {
        category: { eq: $category }
        slug: { eq: $slug }
        locale: { eq: $language }
      }
    ) {
      html
      fields {
        previousSlug
        nextSlug
      }
      frontmatter {
        title
        date
      }
    }
  }
`

export default Post

export const Head = ({ data }) => {
  const { title } = data.markdownRemark.frontmatter
  return <SEO title={title} />
}
