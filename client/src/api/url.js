import api from "../utils/apiClients"

export const shortenUrl = (data) => api.post("/url/shorten", data)
export const getStats = (shortCode, page) => api.get(`/url/${shortCode}/stats?page=${page}&limit=10`)
export const getAllLinks = () => api.get('/url')
export const getLink = (data) => api.get(`/url/${data}`)
export const deleteLink = (data) => api.delete(`/url/${data}`)