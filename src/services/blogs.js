import axios from 'axios'

const baseUrl = '/api/blogs'

// This is the user token, which can be modified outside the module with setToken exported.
let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}



const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}



const create = async newObject => {
    if(newObject.titleField !== undefined && newObject.authorField !== undefined && newObject.urlField !== undefined) {
        const config = {
            headers: { Authorization: token },
        }
        const response = await axios.post(baseUrl, newObject, config)
        return response.data
    }
}

const update =  async (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.put(`${baseUrl}/${id}`, newObject, config)
    const response = await request
    return response.data
}

const remove =  async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const request =  axios.delete(`${baseUrl}/${id}`, config)
    const response = await request
    return response.data
}


export default { getAll, create, update, remove, setToken }