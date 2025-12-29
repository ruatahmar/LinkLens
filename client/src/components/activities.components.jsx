const activities = [
    {
        time: "2025-01-12 14:32",
        location: "India",
        referrer: "twitter.com",
        agent: "Chrome · Windows",
    },
    {
        time: "2025-01-12 13:10",
        location: "USA",
        referrer: "direct",
        agent: "Safari · iOS",
    },
    {
        time: "2025-01-12 12:01",
        location: "Germany",
        referrer: "linkedin.com",
        agent: "Firefox · Linux",
    },
];

export default function RecentActivity() {
    return (
        <div className="mt-10 bg-white border rounded-xl">

            <h2 className="text-xl font-semibold p-6 border-b">
                Recent activity
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-sm text-slate-500">
                        <tr>
                            <th className="px-6 py-3">Time</th>
                            <th className="px-6 py-3">Location</th>
                            <th className="px-6 py-3">Referrer</th>
                            <th className="px-6 py-3">Agent</th>
                        </tr>
                    </thead>

                    <tbody>
                        {activities.map((a, i) => (
                            <tr
                                key={i}
                                className="border-t hover:bg-slate-50 transition"
                            >
                                <td className="px-6 py-4 text-sm">
                                    {a.time}
                                </td>

                                <td className="px-6 py-4 text-sm">
                                    {a.location}
                                </td>

                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {a.referrer}
                                </td>

                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {a.agent}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
