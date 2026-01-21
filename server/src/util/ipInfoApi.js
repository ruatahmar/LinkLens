const getLocationFromIp = async (ip) => {
    if (ip === "::1") {
        return {
            continent: "",
            country: "Localhost"
        }
    }
    const functionalIp = normalizeIPv6(ip)
    const data = await fetch(`free.freeipapi.com/api/json/${functionalIp}`) //https://api.ipinfo.io/lite/${functionalIp}?token=${process.env.IPINFO_API_TOKEN}
    console.log(data)
    return {
        continent: data.continent,
        country: data.country,
    }
}
const normalizeIPv6 = (input) => {
    // match "...:<port>::"
    const match = input.match(/^(.*):(\d{1,5})::$/)

    if (!match) {
        return input // already correct or invalid in another way
    }

    const ipv6 = match[1] + "::"
    const port = match[2]
    console.log(ipv6)
    return ipv6
}

export default getLocationFromIp;