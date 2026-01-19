export function formatClicksByDate(analytics) {
    const map = {}

    analytics.forEach((item) => {
        const dateObj = new Date(item.timestamp)
        const dateKey = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        })

        map[dateKey] = (map[dateKey] || 0) + 1
    })

    return Object.entries(map).map(([date, clicks]) => ({
        date,
        clicks,
    }))
}

export function formatAnalyticsTable(analytics) {
    return analytics.map((item) => {
        const date = new Date(item.timestamp)

        return {
            time: date.toISOString().slice(0, 16).replace("T", " "),
            location: item.continent ? `${item.country}, ${item.continent}` : `${item.country}`,
            referrer: item.referrer || "Direct",
            agent: formatUserAgent(item.userAgent),
        }
    })
}

function formatUserAgent(ua) {
    if (!ua) return "Unknown"
    return ua.split("/")[0]
}
