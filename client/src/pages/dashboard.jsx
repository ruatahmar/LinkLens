import NavBar from "../components/navbar"

export default function Dashboard(){
    return(
    <>
        <div className="flex flex-row h-screen w-screen bg-red ">
            <NavBar/>
            <div className="bg-[#F2F3F2] w-4/5 h-full p-10">
                <h1 className="text-7xl font-bold">
                    DashBoard
                </h1>
                <div className="flex flex-row ">
                    <div className="m-10 p-8 h-40 w-50 border border-black flex flex-col rounded-lg">
                        <h3 className="text-2xl">Total Links</h3>
                        <h1 className="font-bold text-5xl mt-3">100</h1>
                    </div>
                    <div className="m-10 p-8 h-40 w-50 border border-black flex flex-col rounded-lg">
                        <h3 className="text-2xl">Total Clicks</h3>
                        <h1 className="font-bold text-5xl mt-3">100</h1>
                    </div>
                    <div className="m-10 p-8 h-40 w-55 border border-black flex flex-col rounded-lg">
                        <h3 className="text-2xl">Unique Clicks</h3>
                        <h1 className="font-bold text-5xl mt-3">100</h1>
                    </div>
                </div>
                <button>Create New Link</button>
            </div>
        </div>
    </>
    )
}