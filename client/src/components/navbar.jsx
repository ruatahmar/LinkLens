import { useNavigate } from 'react-router-dom';

export default function NavBar(){
    const navigate = useNavigate()
    function redirectDashboard(){
        navigate('/dashboard')
    }
    return(
        <div className="bg-[#E5E6E4] w-1/5 h-full p-10"> 
                <h1 className="text-4xl">LinkLens</h1>
                <ul className='flex flex-col mt-10'>
                    <button onclick={redirectDashboard} className='text-left my-4'><li>Dashboard</li></button>
                    <button onclick={redirectDashboard} className='text-left my-4'><li>My Links</li></button>
                </ul>
        </div>
    )
}