import api from "../utils/apiClients"

export const shortenUrl = (data) => api.post("/url/shorten", data)
export const getStats = (data) => api.get(`/url/${data}/stats`)
export const getAllLinks = () => api.get('/url')
export const getLink = (data) => api.get(`/url/${data}`)
export const deleteLink = (data) => api.delete(`/url/${data}`)