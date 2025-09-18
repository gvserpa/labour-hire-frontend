import {Routes, Route} from "react-router-dom"
import Login from "../pages/login/Login.jsx"
import Register from "../pages/register/Register.jsx"
import Dashboard from "../pages/dashboard/Dashboard.jsx"

function AppRoutes () {
    return (
        <Routes>
            <Route path="/" element={(<Login />)} />
            <Route path="/register" element={(<Register />)} />
            <Route path="/dashboard" element={(<Dashboard />)} />
        </Routes>
    )
}

export default AppRoutes;