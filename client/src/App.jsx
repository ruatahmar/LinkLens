import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import MyLinks from './pages/myLinks';
import LinkAnalytics from './pages/linkAnalytics';

function App() {
    return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/links" element={<MyLinks/>}/>
          <Route path="/mylinks" element={<LinkAnalytics/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
