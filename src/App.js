import React, {useState, useEffect} from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Footer from './components/Footer'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/Login'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])


  const [authorField, setAuthorField] = useState('')
  const [titleField, setTitleField] = useState('')
  const [urlField, setUrlField] = useState('')

  const [loginVisible, setLoginVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Logged-in user
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      // Logging in
      blogService.setToken(user.token)
      setUser(user)
      // Form fields are emptied
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const handleTitleChange = (event) => {
    event.preventDefault()
    setTitleField(event.target.value)
  }
  const handleAuthorChange = (event) => {
    event.preventDefault()
    setAuthorField(event.target.value)
  }
  const handleUrlChange = (event) => {
    event.preventDefault()
    setUrlField(event.target.value)
  }
  const getBlogsS = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }
  const addBlog = async (event) => {
    event.preventDefault()
    
  
    try {
      if(titleField !== undefined && authorField !== undefined && urlField !== undefined) {
        const blog = {
          title: titleField,
          author: authorField,
          url: urlField
        }
        await blogService.create(blog)
        getBlogsS()
        setMessage('Created a new blog')
        setTimeout(() => {
          setMessage(null)
        }, 2000)
        setTitleField('')
        setAuthorField('')
        setUrlField('')
      }
    } catch(error) {
      setErrorMessage(`!!!Error!!! ${error.message}`)
      setTimeout( () => {
        setErrorMessage(null)
      }, 2000)
    }
    
    

  }
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            setPassword={setPassword}
            setUsername={setUsername}
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  const blogForm = () => (
    <form onSubmit={addBlog}>
      Title: <input value={titleField} onChange={handleTitleChange}></input>
      Author: <input value={authorField} onChange={handleAuthorChange}></input>
      Url: <input value={urlField} onChange={handleUrlChange}></input>
      <button type="submit">save</button>
      <div>
        <h2>blogs</h2>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => <Blog key={blog.id} blog={blog}/>)
        }
          
      </div>
    </form>
  )
  
  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={errorMessage} />
      <Notification message={message}></Notification>
      <h2>Login</h2>
      {/* If user === null is truthy, loginForm() is executed, otherwise blogForm */}
    
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {blogForm()}
        </div>
        
      }
      

      

      <Footer />

    </div>
  )
}

export default App