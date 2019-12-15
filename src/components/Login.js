/* eslint-disable no-unused-vars */
import React from 'react'


const LoginForm = ({
    handleLogin,
    username,
    password
}) => {
    const { clear: throwaway1, ...usernameWithourClear } = username
    const { clear: throwaway2, ...passwordWithourClear } = password
    return(
        <form className='loginForm' onSubmit = { handleLogin } >
            <div>
                username
                <input
                    name="username"
                    {...usernameWithourClear}
                />
            </div>
            <div>
                password
                <input
                    name="password"
                    {...passwordWithourClear}
                />
            </div>
            <button type="submit">login</button>
        </form >
    )
}

export default LoginForm