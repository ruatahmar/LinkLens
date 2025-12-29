import NavBar from "../components/navbar.components"
import Links from "../components/myLinks.components"


export default function MyLinks(){
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
                    <Links />
                    <Links />
                    <Links />
                    <Links />
                    <Links />
                    <Links />
                    </div>
                </div>

            </div>
    </>
    )
}