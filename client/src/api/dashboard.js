import api from "../utils/apiClients"

export const dashboardSummary = () => api.get("/dashboard/summary") 