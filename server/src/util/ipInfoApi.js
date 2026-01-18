const getLocationFromIp = async (ip) => {
    if (ip === "::1") {
        return {
            continent: "",
            country: "Localhost"
        }
    }
    const data = await fetch(`https://api.ipinfo.io/lite/${ip}?token=${process.env.IPINFO_API_TOKEN}`)

    return {
        continent: data.continent,
        country: data.country,
    }
}

export default getLocationFromIp;