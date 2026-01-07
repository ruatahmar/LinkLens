import api from "../utils/apiClients"

export const shortenUrl = (data) => api.post("/url/shorten", data)
export const getStats = (data) => api.get(`/url/${data}`)
export const getAllLinks = () => api.get('/url')