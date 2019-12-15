import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import SimpleBlog from './SimpleBlog'
import Blog from './Blog'
import { prettyDOM, queryByTestId } from '@testing-library/dom'

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'mommy',
        likes: 0,
    }
    const component = render(
        <SimpleBlog blog={blog} />
    )

    //const button = component.container.querySelector('button')
    //console.log(prettyDOM(button))
    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
        'mommy'
    )
    expect(component.container).toHaveTextContent(
        'blog has'
    )
})



test('clicking the button calls event handler twice', () => {
    const blog = {
        content: 'Component testing is done with react-testing-library',
        author: 'mommy'
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})


describe('<Blog />', () => {
    let component
    const blog = {
        title: 'Best blogs under sun',
        author: 'mommy',
        likes: 0,
        userId: '5de5778fc3b88c26c013e6fe'
    }
    const user = {
        username: 'MattiNykänen',
        name: 'Mattiii'
    }
    const mockHandler = jest.fn()
    beforeEach(() => {
        component = render(
            <Blog blog={blog} state={mockHandler} cur={false} user={user}>
                <div className="testDiv" />
            </Blog>
        )
    })

    test('renders its children', () => {
        component.container.querySelector('.testDiv')
    })

    test('at start the children are not displayed', () => {
        expect(component.container).not.toHaveTextContent(
            'likes'
        )
        expect(component.container.querySelector('button')).toBeNull()
        //component.debug()
    })

    test('after clicking the button, children are displayed', () => {
        const button = component.container.querySelector('.collapsed')
        fireEvent.click(button)
        expect(component.container).toHaveTextContent(
            'like'
        )
    })

})


