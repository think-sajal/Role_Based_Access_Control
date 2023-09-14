import { Link } from "react-router-dom"

const Sidebar = () => {

    const routes = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/settings', label: 'Settings' }
    ]

    return <div className="container border-end border-3 m-0 bg-white" style={{ width: 'fit-content', zIndex: 1 }} >
        <div className="col vh-100">
            <div className="h-50 row-4 d-flex flex-column">
                { 
                    routes.map(
                        ({ path, label }) => (
                            <Link key={`${new Date().getTime()} + ${label}`} to={path} className='text-center my-3' style={{ textDecoration: 'none', cursor: "pointer", minWidth: '200px' }}>
                                {label}
                            </Link>
                        )
                    )
                }
            </div>
        </div>
    </div>
}

export default Sidebar