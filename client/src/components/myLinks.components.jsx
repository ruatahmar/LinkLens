import { useNavigate } from "react-router-dom"

export default function Links({ linkName, linkUrl}){
    const navigate = useNavigate()
    function handleClick(){
        navigate(`/links/${linkName}`)
    }
    return(
        <>
            <div onClick={handleClick} className="h-40 w-80 border rounded-xl flex flex-col justify-center items-center  transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-lg ">
                <h1 className="font-bold text-3xl">{linkName}</h1>
                <h1>{linkUrl}</h1>
            </div>
        </>
    )
}