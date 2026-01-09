import NavBar from "../components/navbar.components"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { dashboardSummary } from "../api/dashboard"
import { shortenUrl } from "../api/url"
export default function Dashboard(){
    const [summary, setSummary] = useState({
        totalLinks: 0,
        totalClicks: 0
    });
    const [linkName, setLinkName] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [originalUrl, setOriginalUrl] = useState("")

    const navigate = useNavigate()
    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await dashboardSummary();
                setSummary(res.data.data);
            } catch (err) {
                alert("Failed to load dashboard",err);
                console.log("error: ",err)
            }
            // finally {
            //     setLoading(false);   
            // }
        };

        fetchSummary();
    }, []);
    const createNewLink = async ()=> {
        try{
            const response = await shortenUrl({linkName,originalUrl})
            console.log("Link Successfully Created: ", response.data.message)
            const shortUrl = response.data.data.shortCode
            navigate(`/links/${shortUrl}`)
        }
        catch(err){
            alert(err.response.data.message)
            console.log("error: ",err)
        }
    }
    return(
    <>  {/* Main Screen */}
        <div className="flex flex-row h-screen w-screen bg-red ">
            <NavBar/>
            <div className="bg-[#F2F3F2] w-4/5 h-full p-10">
                <h1 className="text-7xl font-bold text-[#698796]">
                    DashBoard
                </h1>
                <div className="flex flex-row">
                    <div className="m-10 p-8 h-40 w-50 border border-black flex flex-col rounded-lg">
                        <h3 className="text-2xl">Total Links</h3>
                        <h1 className="font-bold text-5xl mt-3">{summary.totalLinks}</h1>
                    </div>
                    <div className="m-10 p-8 h-40 w-50 border border-black flex flex-col rounded-lg">
                        <h3 className="text-2xl">Total Clicks</h3>
                        <h1 className="font-bold text-5xl mt-3">{summary.totalClicks}</h1>
                    </div>
                    {/* <div className="m-10 p-8 h-40 w-55 border border-black flex flex-col rounded-lg">
                        <h3 className="text-2xl">Unique Clicks</h3>
                        <h1 className="font-bold text-5xl mt-3">100</h1>
                    </div> */}
                </div>
                <button
                onClick={() => setShowForm(true)} 
                className="bg-[#E5E6E4] border p-2 m rounded hover:bg-[#69968F] hover:text-white">
                    Create New Link
                </button>
            </div>
        </div>
        {/* FORM MODAL */}
        {showForm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-96">
                    <h2 className="text-2xl font-bold mb-4">Create New Link</h2>
                    <input
                        type="text"
                        name="linkName"
                        value={linkName}
                        onChange={(e)=>setLinkName(e.target.value)}
                        placeholder="Link Name"
                        className="w-full border p-2 mb-3 rounded"
                    />
                    <input
                        type="text"
                        name="originalUrl"
                        value={originalUrl}
                        onChange={(e)=>setOriginalUrl(e.target.value)}
                        placeholder="Original URL"
                        className="w-full border p-2 mb-3 rounded"
                    />
                    {/* <input
                        type="text"
                        
                        placeholder="Custom Slug (optional)"
                        className="w-full border p-2 mb-3 rounded"
                    /> */}

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setShowForm(false)}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={createNewLink} 
                            className="px-4 py-2 bg-black text-white rounded"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
    )
}