import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import MyLinks from './pages/myLinks';
import LinkAnalytics from './pages/linkAnalytics';
import { AuthContext, AuthProvider } from './auth/authContext';
import PublicRoute from './routes/PublicRoutes';
import ProtectedRoute from './routes/protectedRoutes';
import RootRedirect from './routes/rootRedirect';

function App() {
    return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            {/* Public */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register/>} />
            </Route>
            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/links" element={<MyLinks/>}/>
              <Route path="/links/:shortCode" element={<LinkAnalytics/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
