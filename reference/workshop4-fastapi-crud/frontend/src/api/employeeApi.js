import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8011'

export const getEmployees    = ()           => axios.get(`${BASE_URL}/employees`)
export const getEmployee     = (id)         => axios.get(`${BASE_URL}/employees/${id}`)
export const createEmployee  = (data)       => axios.post(`${BASE_URL}/employees`, data)
export const updateEmployee  = (id, data)   => axios.put(`${BASE_URL}/employees/${id}`, data)
export const deleteEmployee  = (id)         => axios.delete(`${BASE_URL}/employees/${id}`)
