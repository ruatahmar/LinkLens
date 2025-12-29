import Links from "../components/myLinks.components"
import NavBar from "../components/navbar.components"
import ClicksChart from "../components/clickCharts.components"
import RecentActivity from "../components/activities.components"

export default function LinkAnalytics(){

    return (
            <div className="flex h-screen w-screen overflow-hidden bg-[#F2F3F2]">
                <NavBar/>
                <div className="w-4/5 h-full overflow-y-auto p-10">
                    <header className="flex justify-between items-start     ">
                        {/* left side */}
                        <div>
                            <h1 className="text-7xl font-bold text-[#698796] mb-6">
                            Link Name 
                            </h1>
                            <div className="text-sm text-slate-600">
                                Short URL:{" "}
                                <span className="font-mono text-slate-800">
                                    linklens.dev/abc123
                                </span>
                            </div>
                            <div className="text-sm text-slate-600">
                                Original URL:{" "}
                                <span className="truncate inline-block max-w-xl align-bottom text-slate-800">
                                    https://very-long-original-url.com/path
                                </span>
                            </div>
                        </div>
                        {/* right side */}
                        <div className="flex gap-3 mt-8">
                            <button className="px-4 py-2 rounded-lg border hover:bg-slate-100 transition">
                            Copy Link
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-[#69968F] text-white hover:bg-green-400 transition
                            ">
                            Enabled
                            </button>
                        </div>
                    </header>
                    <div className="grid grid-cols-4 w-4/5">
                        <div className="m-8 p-8 h-40 w-50 border border-black flex flex-col rounded-lg">
                            <h3 className="text-2xl">Total Clicks</h3>
                            <h1 className="font-bold text-5xl mt-3">100</h1>
                        </div>
                        <div className="m-8 p-8 h-40 w-51 border border-black flex flex-col rounded-lg">
                            <h3 className="text-2xl">Unique Links</h3>
                            <h1 className="font-bold text-5xl mt-3">100</h1>
                        </div>
                        <div className="m-8 p-8 h-40 w-50 border border-black flex flex-col rounded-lg">
                            <h3 className="text-2xl">Clicks Today</h3>
                            <h1 className="font-bold text-5xl mt-3">100</h1>
                        </div>
                        <div className="m-8 p-8 h-40 w-50 border border-black flex flex-col rounded-lg">
                            <h3 className="text-2xl">Status</h3>
                            <h1 className="font-bold text-5xl mt-3">ON</h1>
                        </div>
                        
                        
                    </div>
                    {/*Chart */}
                    <ClicksChart />
                    {/* Recent Activities */}
                    <RecentActivity />
                </div>
            </div>
    )
}