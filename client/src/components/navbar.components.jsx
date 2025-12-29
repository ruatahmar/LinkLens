import { useNavigate } from 'react-router-dom';

export default function NavBar(){
    const navigate = useNavigate()
    function redirectDashboard(){
        navigate('/dashboard')
    }
    function redirectMyLinks(){
        navigate("/links")
    }
    return(
        <div className="bg-[#E5E6E4] w-1/5 h-full p-10"> 
                <h1 className="text-5xl text-[#697096] font-bold">LinkLens</h1>
                <ul className='flex flex-col mt-10'>
                    <li onClick={redirectDashboard} className='text-left my-4 text-xl font-semibold hover:text-[#697096]'>Dashboard</li>
                    <li onClick={redirectMyLinks} className='text-left my-4 text-xl font-semibold hover:text-[#697096]'>My Links</li>
                </ul>
        </div>
    )
}