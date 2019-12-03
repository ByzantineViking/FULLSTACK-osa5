import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <p>"{blog.title}" By: {blog.author}</p>
  </div>
)

export default Blog