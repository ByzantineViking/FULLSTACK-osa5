import React, {useState} from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog }) => {
  const [expand, setExpansion] = useState(false)
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    marginTop: 5,
    border: "solid 2px black",
    borderRadius: "3px",
    width: "30%"
  }
  const like = (props) => {
    blogService.update(
      blog.id,
      {
        author: blog.author,
        title: blog.title,
        likes: blog.likes + 1,
        url: blog.url,
        userId: blog.userId
      }
    )
  }
  const remove = async () => {
    const ret = await window.confirm(`Are you sure you want to remove blog '${blog.title}'`)
    if(ret) {
      const userToken = await window.localStorage.getItem('loggedBlogAppUser')
      
      blogService.remove(blog.id, `bearer ${userToken.token}`)
    }
  }

  if(expand) {
    return (
      <div style={style}>
        <p style= {{fontWeight:"700", color:"darkblue", cursor: "pointer" }}onClick={() => setExpansion(!expand)}>{blog.title}</p>
        <p>Author: {blog.author}</p>
        <div style={{ display: "inline" }}>URL: </div><a href={blog.url}>{blog.url}</a>  
        <div style= {{marginBottom: "14px"}}>
          <p style={{ display: "inline" }}>Likes:  {blog.likes}</p><button onClick={like} style={{marginLeft:"14px"}}>like</button>
        </div>
        <button onClick={remove}>remove</button>
      </div>
    )
  } else {
    return (
      <div onClick={() => setExpansion(!expand)}>
        <p>"{blog.title}" By: {blog.author}</p>
      </div>
    )
  }

  
}


export default Blog