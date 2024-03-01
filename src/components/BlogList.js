import React, { useMemo } from 'react'
import Blog from './Blog'

const BlogList = ({ data }) => {
  return (
    <div>
      {data.map((node) => (
        <Blog key={node.id} node={node} />
      ))}
    </div>
  )
}

export default BlogList
