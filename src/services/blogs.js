import axios from 'axios'
const baseUrl = '/api/blogs'

// This is the user token, which can be modified outside the module with setToken exported.
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}



const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
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

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.map(response => response.data)
}

const remove = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`)
  return request.map(response => response.data)
}


export default { getAll, create, update, remove, setToken }