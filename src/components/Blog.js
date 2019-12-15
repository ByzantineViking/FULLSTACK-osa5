import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const Blog = ({ blog, state, cur, user }) => {
    const [expand, setExpansion] = useState(false)
    const style = {
        paddingTop: 10,
        paddingLeft: 2,
        marginTop: 5,
        border: 'solid 2px black',
        borderRadius: '3px',
        width: '30%'
    }
    const like = async () => {
        const ret = await blogService.update(
            blog.id,
            {
                author: blog.author,
                title: blog.title,
                likes: blog.likes + 1,
                url: blog.url,
                userId: blog.userId
            }
        )
        // eslint-disable-next-line require-atomic-updates
        blog.likes = ret.likes
        state(() => !cur)

    }

    const remove = async () => {
        const ret = await window.confirm(`Are you sure you want to remove blog '${blog.title}'`)
        if(ret) {
            await blogService.remove(blog.id)
            state(() => !cur)
        }
    }

    if(expand) {
        return (
            <div className='expanded' style={style}>
                <p style= {{ fontWeight:'700', color:'darkblue', cursor: 'pointer' }}onClick={() => setExpansion(!expand)}>{blog.title}</p>
                <p>Author: {blog.author}</p>
                <div style={{ display: 'inline' }}>URL: </div><a href={blog.url}>{blog.url}</a>
                <div style= {{ marginBottom: '14px' }}>
                    <p style={{ display: 'inline' }}>Likes:  {blog.likes}</p><button onClick={() => like()} style={{ marginLeft:'14px' }}>like</button>
                </div>
                {blog.userId.username === user.username ?
                    <button style={{ margin:'5px' }}onClick={remove}>remove</button> :
                    <div></div>
                }
            </div>
        )
    } else {
        return (
            <div className='collapsed' onClick={() => setExpansion(!expand)}>
                <p>{ blog.title } By: {blog.author}</p>
            </div>
        )
    }
}


Blog.propTypes = {
    state: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    cur: PropTypes.bool.isRequired,
}


export default Blog