/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react'
//import blogService from './services/blogs'
import loginService from './services/login'

import Footer from './components/Footer'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/Login'

import { useField } from './hooks/useField'
import useResource from './hooks/useResource'

import './App.css'

const App = () => {
    const [blogs, blogService] = useResource('http://localhost:3003/api/blogs')

    const [loginVisible, setLoginVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [message, setMessage] = useState(null)



    const [creatingNew, setCreatingNew] = useState(false)
    // Logged-in user
    const [user, setUser] = useState(null)

    // Login form input states
    const username = useField('text')
    const password = useField('text')

    // Blog creation form input states
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')


    const [likeUpdate, setLikeUpdate] = useState(false)




    useEffect(() => {
        blogService.getAll()
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
            username.clear()
            password.clear()
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const addBlog = async (event) => {
        event.preventDefault()
        try {
            if(title.value !== undefined && author.value !== undefined && url.value !== undefined) {
                const blog = {
                    title: title.value,
                    author: author.value,
                    url: url.value
                }
                await blogService.create(blog)
                setMessage('Created a new blog')
                setTimeout(() => {
                    setMessage(null)
                }, 2000)
                title.clear()
                author.clear()
                url.clear()
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
                        handleLogin={handleLogin}
                        username={username}
                        password={password}
                    />
                    <button onClick={() => setLoginVisible(false)}>cancel</button>
                </div>
            </div>
        )
    }

    const { clear: throwaway1, ...titleWithoutClear } = title
    const { clear: throwaway2, ...authorWithoutClear } = author
    const { clear: throwaway3, ...urlWithoutClear } = url
    const blogCreation = () => (
        <form onSubmit={addBlog}>
            Title: <input {...titleWithoutClear}></input>
            Author: <input {...authorWithoutClear}></input>
            Url: <input {...urlWithoutClear}></input>
            {
                creatingNew ?
                    <button type="submit">save</button> :
                    <div/>
            }
        </form>
    )

    const blogForm = () => (
        <div>
            <h2>blogs</h2>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog => <Blog key={blog.id} blog={blog} state={setLikeUpdate} cur={likeUpdate} user={user} />)
            }
        </div>
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
                    {creatingNew === true ?
                        <div>
                            <button onClick={() => setCreatingNew(!creatingNew)}>hide</button>
                            {blogCreation()}
                        </div> :
                        <button onClick={() => setCreatingNew(!creatingNew)}>create new</button>
                    }
                    {blogForm()}
                </div>
            }
            <Footer />

        </div>
    )
}

export default App