import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:8080/auth/register",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Register successful:', data);

        localStorage.setItem('token', data.token);

        navigate('/dashboard');
      } else {
        console.error('Login failed:', data.message);
        alert(data.message);
      }
    }
    catch(error){
      console.error('Error logging in:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow-md w-80 flex flex-col gap-4"
      >
        <h1 className="text-xl font-semibold text-center">Register</h1>

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
          Register
        </button>
        
      </form>
      
    </div>
  );
}
