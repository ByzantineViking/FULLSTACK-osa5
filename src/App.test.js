import React from 'react'
import {
    render, waitForElement
} from '@testing-library/react'

import App from './App'
import { prettyDOM, queryByTestId } from '@testing-library/dom'



describe('<App />', () => {
    test('if no user logged, blogs are not rendered', async () => {
        const component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText('login')
        )
        expect(component.container).toHaveTextContent(
            'log in'
        )
        const loginForm = component.container.querySelector('.loginForm')
        expect(component.container).toContainElement(loginForm)

        expect(component.container).not.toHaveTextContent('101 ways to google')
    })
})


describe('<App />', () => {
    test('renders all notes it gets from backend', async () => {
        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Donald Tester'
        }
        // We login with the mock user. Login mock is defined in setupTests.js
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))


        const component = render(
            <App />
        )

        //This is done to ensure that all of the effects are executed.
        //This command may no longer be necessary with newer versions of React
        component.rerender(<App />)
        await waitForElement(
            () => component.getByText(`${user.name} logged in`)
        )

        const blogs = component.container.querySelectorAll('.collapsed')
        expect(blogs.length).toBe(2)

        expect(component.container).toHaveTextContent(
            'The blogs you have always wanted to read'
        )
        expect(component.container).toHaveTextContent(
            '101 ways to google'
        )
        expect(component.container).toHaveTextContent(
            'meimei'
        )
    })
})

