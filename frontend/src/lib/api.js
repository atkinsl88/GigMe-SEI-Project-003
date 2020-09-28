import axios from 'axios'
import { getToken } from './auth'
const baseUrl = 'http://localhost:3000/api'

export const withHeaders = () => { 
  return {
    headers: { Authorization: `Bearer ${getToken()}` }  
  }
}


// * Gig Requests

export const getAllGigs = () => {
  return axios.get(`${baseUrl}/events`)
}

export const createGig = formData => {
  return axios.post(`${baseUrl}/events`, formData, withHeaders())
}

export const editGig = (formData, id) => {
  return axios.put(`${baseUrl}/events/${id}`, formData, withHeaders())
}

export const getSingleGig = id => {
  return axios.get(`${baseUrl}/events/${id}`)
}

export const deleteGig = id => {
  return axios.delete(`${baseUrl}/events/${id}`, withHeaders())
}

// * Auth Requests

export const registerUser = formData => {
  return axios.post(`${baseUrl}/register`, formData)
}

export const loginUser = formData => {
  return axios.post(`${baseUrl}/login`, formData)
}

export const createComment = (formData, id) => {
  return axios.post(`${baseUrl}/events/${id}/comments`, formData, withHeaders())
}

// * Other Requests

export const createLike = (likes, id) => {
  return axios.post(`${baseUrl}/events/${id}/like`, likes, withHeaders())
}

export const getSingleUser = id => {
  return axios.get(`${baseUrl}/users/${id}`)
}

// community 
// export const createMessage = formData => {
//   return axios.post(`${baseUrl}/community`, formData, withHeaders())
// }

