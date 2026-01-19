import Links from "../components/myLinks.components"
import NavBar from "../components/navbar.components"
import ClicksChart from "../components/clickCharts.components"
import RecentActivity from "../components/activities.components"
import { getStats, getLink, deleteLink } from "../api/url"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
// import { useEffect } from "react"
export default function LinkAnalytics(){
    const { shortCode } = useParams();
    const [stats, setStats] = useState([])
    const [link, setLink] = useState({})
    const [page, setPage] =useState(1);

    const navigate = useNavigate()

    const handleDeleteLink = async() =>{
        const res = await deleteLink(shortCode)
        if(!res){
            alert("something wrong")
        }
        navigate("/links")
    }
    useEffect(()=>{
        const getAllStats = async() =>{
            const res = await getStats(shortCode, page)
            setStats(res.data.data)
            
        }
        const getLinkDetails = async() => {
            const res = await getLink(shortCode)
            console.log(res.data.data)
            setLink(res.data.data)
        }

        getLinkDetails()
        getAllStats()
        
    }, [])
    return (
            <div className="flex h-screen w-screen overflow-hidden bg-[#F2F3F2]">
                <NavBar/>
                <div className="w-4/5 h-full overflow-y-auto p-10">
                    <header className="flex justify-between items-start     ">
                        {/* left side */}
                        <div>
                            <h1 className="text-7xl font-bold text-[#698796] mb-6">
                            {link.linkName} 
                            </h1>
                            <div className="text-sm text-slate-600">
                                Short URL:{" "}
                                <span className="font-mono text-slate-800">
                                    linklens.dev/{link.shortCode}
                                </span>
                            </div>
                            <div className="text-sm text-slate-600">
                                Original URL:{" "}
                                <span className="truncate inline-block max-w-xl align-bottom text-slate-800">
                                    {link.originalUrl}
                                </span>
                            </div>
                        </div>
                        {/* right side */}
                        <div className="flex gap-3 mt-8">
                            <button className="px-4 py-2 rounded-lg border hover:bg-green-400 hover:text-white transition">
                            Copy Link
                            </button>
                            <button onClick={handleDeleteLink} className="px-4 py-2 rounded-lg bg-[#69968F] text-white hover:bg-red-400 transition
                            ">
                            Delete
                            </button>
                        </div>
                    </header>
                    <div className="grid grid-cols-4 w-4/5">
                        <div className="m-8 p-8 h-40 w-50 border border-black flex flex-col rounded-lg">
                            <h3 className="text-2xl">Total Clicks</h3>
                            <h1 className="font-bold text-5xl mt-3">{link.clickCount}</h1>
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
                    <ClicksChart analytics={stats}/>
                    {/* Recent Activities */}
                    <RecentActivity analytics={stats}/>
                </div>
            </div>
    )
}