import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const AuthRoutes = ({ children }) => {
    const { user } = useAuth0();
    if (!user) {
        return <Navigate to="/" replace />;
    }
    return (
        <React.Fragment>
            <div id='layout-wrapper'>
                <Navbar />
                <div  className="d-flex">
                    <Sidebar />
                    <div className='main-content w-100'>{ children }</div>
                </div>
            </div>
        </React.Fragment>
    )
};
