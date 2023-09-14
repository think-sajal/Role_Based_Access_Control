import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export default function Navbar() {
    const { logout } = useAuth0();
    return (
        <div className="p-3 bg-dark text-white">
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <button 
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            localStorage.clear();
                            return logout({ returnTo: window.location.origin })
                        }}
                    >Logout</button>
                </li>
            </ul>
        </div>
    )
}
