import NavBar from "../components/navbar.components"
import Links from "../components/myLinks.components"
import { getAllLinks } from "../api/url"
import { useEffect } from "react"
import { useState } from "react"


export default function MyLinks(){
    const [links, setLinks] = useState([])
    useEffect(() => {
        const fetchAllLinks = async() => {
            try{
                const res = await getAllLinks();
                setLinks(res.data.data)
                
            }
            catch(err){
                console.log(err)
            }
            
        };

        fetchAllLinks();
    }, [])
    const linksToDisplay = links.map((link) =>  {
        return <Links 
            key={link._id}
            linkName = {link.linkName}
            linkUrl = {link.originalUrl}
        />
    })
    return (
        <>
             <div className="flex h-screen w-screen overflow-hidden bg-[#F2F3F2]">
      
                {/* Navbar */}
                <NavBar />

                {/* Right side (scrollable) */}
                <div className="w-4/5 h-full overflow-y-auto p-10">
                    <h1 className="text-7xl font-bold text-[#698796]">
                    My Links
                    </h1>

                    {/* link grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center mt-15 rounded-2xl ">
                        {linksToDisplay}
                    </div>
                </div>

            </div>
    </>
    )
}