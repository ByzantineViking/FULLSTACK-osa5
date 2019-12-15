import '@testing-library/jest-dom/extend-expect'
jest.mock('./services/blogs')


// Local storage mock
let savedItems = {}

const localStorageMock = {
    setItem: (key, item) => {
        savedItems[key] = item
    },
    getItem: (key) => savedItems[key],
    clear: () => {
        savedItems = {}
    }
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })



// Dismissing a React error, which will be patched in 16.9.0
const originalError = console.error
beforeAll(() => {
    console.error = (...args) => {
        if (/Warning.*not wrapped in act/.test(args[0])) {
            return
        }
        //originalError.call(console, ...args)
    }
})

afterAll(() => {
    console.error = originalError
})



