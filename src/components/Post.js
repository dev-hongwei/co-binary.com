import React from 'react'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'
import { getFormattedDate } from '../utils/helper'

const Post = ({ node, showFullDate }) => {
  const { i18n } = useI18next()
  const formattedDate = getFormattedDate(
    node.date,
    i18n.resolvedLanguage,
    showFullDate,
  )
  return (
    <Link to={node.slug} key={node.id} className="post">
      <h3>{node.title}</h3>
      <time>{formattedDate}</time>
    </Link>
  )
}

export default Post
