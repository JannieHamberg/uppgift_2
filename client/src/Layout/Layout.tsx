import { Footer } from "../Components/Footer"
import { NavBar } from "../Components/NavBar"
import { Outlet } from "react-router-dom"

export const Layout = () => {
    
    return (
        <div className="w-screen">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}