import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { Settings } from "../pages/Settings";
import { AuthRoutes } from "./AuthRoutes";
import { NotFoundRoutes } from "./NotFoundRoutes";
import { PublicRoutes } from "./PublicRoutes";

const router = createBrowserRouter([
    { path: "/", element: <PublicRoutes><Login /></PublicRoutes> },
    { path:"/dashboard", element: <AuthRoutes><Dashboard /></AuthRoutes> },
    { path:"/settings", element: <AuthRoutes><Settings /></AuthRoutes> },
    { path:"*", element: <NotFoundRoutes /> },
])

export function Routes(props) {
    return (
        <RouterProvider router={router}></RouterProvider>
    );
}
