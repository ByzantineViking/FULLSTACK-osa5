
let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const blogs = [
    {
        title: 'The blogs you have always wanted to read',
        author: 'daddy',
        likes: 0,
        userId: '5de5778fc3b88c26c013e6fe'
    },
    {
        title: '101 ways to google',
        author: 'meimei',
        likes: 0,
        userId: '5de5778fc3b88c26c013e6fe'
    },
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, setToken }
