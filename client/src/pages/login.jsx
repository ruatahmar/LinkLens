import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth'
import { AuthContext } from "../auth/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setUser} = useContext(AuthContext)
  const handleRedirect = () => {
    navigate('/register'); 
  };
  const handleLogin = async (e) => {
    
    e.preventDefault(); 
    try {
      const data = await login({email, password});
      setUser(data.data.data.user)
      console.log(data.data.message)
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80 flex flex-col gap-4"
      >
        <h1 className="text-xl font-semibold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Login
        </button>
        <button
          onClick={handleRedirect }
          className="bg-purple-600 text-white py-2 m rounded hover:bg-purple-700"
        >
          Register
        </button>
      </form>
      
    </div>
  );
}
