import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";
import { ADMIN_ROLE } from "../constants";
import { Button, Modal } from "@mui/material";
import CryptoJS from "crypto-js";
import { Api } from "../helper/Api";

export function Dashboard() {    

    const { user, logout } = useAuth0();
    
    const [showModal, setShowModal] = useState({
        create: false,
        update: false,
        view: false,
        delete: false
    });
    const [data, setData] = useState([])

    const [current, setCurrent] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        c_password: '',
        role: '',
        phone: '',
        address_lane_one: '',
        address_lane_two: '',
        city: '',
        state: '',
        zip: '',
        designation: '',
        experience: ''
    })

    const [messageModal, setMessageModal] = useState({
        status: false,
        message: '',
        title: ''
    });

    const getUsers = async () => {
        const res = await Api.getUsers();
        let data = res.data;
        data.splice( data.findIndex(obj => obj.id === user.sub), 1 );
        setData(data);
    }; 
    useEffect(() => { 
        if (!localStorage.getItem('token')) {
            logout({ returnTo: window.location.origin })
        }
        getUsers()
    }, []);

    const columns =  [
        {
            Header: "First Name",
            accessor: "first_name"
        },
        {
            Header: "Last Name",
            accessor: "last_name"
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Role",
            accessor: "role"
        },
        {
            Header: "Phone",
            accessor: "phone"
        },
        {
            accessor: 'accessor',
            Header: 'Actions',
            Cell: ({ row: { original } }) => (
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <AiOutlineEllipsis></AiOutlineEllipsis>
                    </button>
                    <ul className="p-0 dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        { user.role.includes(ADMIN_ROLE) ? <li className="py-1 border text-center" onClick={() => {
                            let data = { ...showModal };
                            data.update = true;
                            setShowModal(data);
                            setCurrent({ ...original });
                        }}>Edit</li> : null }
                        { user.role.includes(ADMIN_ROLE) ? <li className="py-1 border text-center" onClick={() => {
                            let data = { ...showModal };
                            data.delete = true;
                            setShowModal(data);
                            setCurrent({ ...original });
                        }}>Delete</li> : null}
                        <li className="py-1 border text-center" onClick={() => {                   
                            let data = { ...showModal };
                            data.view = true;
                            setShowModal(data);
                            setCurrent({ ...original });
                        }}>View</li>
                    </ul>
                </div>
            ),
        },
    ];

    const DeleteUserModal = () => (
        <Modal open={showModal.delete} onClose={() => {
            let data = { ...showModal };
            data.delete = false;
            setShowModal(data);
            resetUserDetails();
        }}>
            <div 
                style={{ 
                    maxWidth: 450, 
                    maxHeight: 700,
                    overflow: 'overlay'
                }}
                className="bg-white mx-auto my-5 rounded scrollbar p-4"
                onSubmit={(event) => {
                    event.preventDefault()
                }}
            >
                <h3 className="mb-4">Delete User</h3>
                <p>Are you sure you want to delete the user ?</p>
                <div className="d-flex my-4 justify-content-end">
                    <Button onClick={() => {
                        let data = { ...showModal };
                        data.delete = false;
                        setShowModal(data);
                    }} variant="contained" className="bg-secondary me-2">Close</Button>
                    <Button type="submit" onClick={() => { deleteUser() }} variant="contained" className="ms-2">Submit</Button>
                </div>
            </div>
        </Modal>
    )

    function onCloseUser() {
        let data = { ...showModal };
        data.create = !data.create ? data.create : false;
        data.update = !data.update ? data.update : false;
        data.view = !data.view ? data.view : false;
        data.delete = !data.delete ? data.delete : false;
        setShowModal(data);
        resetUserDetails();
    }

    const createUser = async () => {
        const { password, c_password } = current;
        if (password !== c_password) {
            return;
        }
        const ciphertext = CryptoJS.AES.encrypt(password, process.env.REACT_APP_CRYPTO_SECRET).toString();
        current.password = ciphertext;
        current.c_password = ciphertext;
        const response = await Api.createUser(current);
        if (response.data.status === 'success') {
            onCloseUser()
            setMessageModal({
                status: true,
                message: 'User created successfully',
                title: 'Success'
            });
            getUsers();    
        } else {
            setMessageModal({
                status: true,
                message: response.data.message,
                title: 'Error'
            });
        }
    }


    const updateUser = async () => {
        const response = await Api.updateUser( current.id, current );
        if (response.data.status === 'success') {
            onCloseUser()
            setMessageModal({
                status: true,
                message: 'User updated successfully',
                title: 'Success'
            });
            getUsers();
        } else {
            setMessageModal({
                status: true,
                message: response.data.message,
                title: 'Error'
            });
        }
    }


    const deleteUser = async () => {
        const response = await Api.deleteUser(current.id);
        if (response.data.status === 'success') {
            onCloseUser()
            setMessageModal({
                status: true,
                message: 'User deleted successfully',
                title: 'Success'
            });
            getUsers();    
        } else {
            setMessageModal({
                status: true,
                message: response.data.message,
                title: 'Error'
            });
        }
    }

    const UserDetailsModal = () => (
        <Modal open={ showModal.create || showModal.update || showModal.view } onClose={() => { onCloseUser() }}>
            <form 
                style={{ 
                    maxWidth: 450, 
                    maxHeight: 700,
                    overflow: 'overlay'
                }}
                className="bg-white mx-auto my-5 rounded scrollbar p-4"
                onSubmit={async (event) => {
                    event.preventDefault()
                    if (showModal.create) createUser()
                    if (showModal.update) updateUser()
                }}
            >
                <h3 className="mb-4">{showModal.create ? 'Add' : showModal.update ? 'Edit' : showModal.view ? 'View' : ''} User</h3>
                <div className="form-group mt-2">
                    <label>First Name</label>
                    <input type="text" name='first_name' className="form-control" value={current?.first_name} onChange={handleOnChange} disabled={showModal.view} required/>
                </div>
                <div className="form-group mt-2">
                    <label>Last Name</label>
                    <input type="text" name="last_name" className="form-control" value={current?.last_name} onChange={handleOnChange} disabled={showModal.view}  required/>
                </div>
                <div className="form-group mt-2">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={current?.email} onChange={handleOnChange} disabled={showModal.view}  required/>
                </div>
                {
                    showModal.create ? (
                        <>
                            <div className="form-group mt-2">
                                <label>Password</label>
                                <input type="password" name="password" className="form-control" value={current?.password} onChange={handleOnChange} disabled={showModal.view}  required/>
                            </div>
                            <div className="form-group mt-2">
                                <label>Confirm Password</label>
                                <input type="password" name="c_password" className="form-control" value={current?.c_password} onChange={handleOnChange} disabled={showModal.view}  required/>
                            </div>
                        </>
                    ) : null
                }
                <div className="form-group mt-2">
                    <label>Role</label>
                    <select className="form-select" onChange={handleOnChange} value={current?.role} disabled={showModal.view} name="role" defaultValue={'Select'}>
                        <option value="Select" disabled>Select</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                </div>
                <div className="form-group mt-2">
                    <label>Phone</label>
                    <input type="text"name="phone" pattern="\d*" maxLength="10" className="form-control" value={current?.phone} onChange={handleOnChange} disabled={showModal.view} required/>
                </div>
                <div className="form-group mt-2">
                    <label>Address 1</label>
                    <input type="text" name="address_lane_one" className="form-control" value={current?.address_lane_one} onChange={handleOnChange} disabled={showModal.view} />
                </div>
                <div className="form-group mt-2">
                    <label>Address 2</label>
                    <input type="text" name="address_lane_two" className="form-control" value={current?.address_lane_two} onChange={handleOnChange} disabled={showModal.view} />
                </div>
                <div className="form-group mt-2">
                    <label>City</label>
                    <input type="text" name="city" className="form-control" value={current?.city} onChange={handleOnChange} disabled={showModal.view} />
                </div>
                <div className="form-group mt-2">
                    <label>State</label>
                    <input type="text" name="state" className="form-control" value={current?.state} onChange={handleOnChange} disabled={showModal.view} />
                </div>
                <div className="form-group mt-2">
                    <label>Zip</label>
                    <input type="text" name="zip"  pattern="\d*" maxLength="6" className="form-control" value={current?.zip} onChange={handleOnChange} disabled={showModal.view} />
                </div>
                <div className="form-group mt-2">
                    <label>Designation</label>
                    <input type="text" name="designation" className="form-control" value={current?.designation} onChange={handleOnChange} disabled={showModal.view} />
                </div>
                <div className="form-group mt-2">
                    <label>Experience</label>
                    <input type="text" name="experience"  pattern="\d*" maxLength="2" value={current?.experience} className="form-control" onChange={handleOnChange} disabled={showModal.view} />
                </div>
                <div className="d-flex my-4 justify-content-end">
                    <Button onClick={() => { onCloseUser() }} variant="contained" className="bg-secondary me-2">Close</Button>
                    <Button type="submit" variant="contained" className="ms-2">Submit</Button>
                </div>
            </form>
        </Modal>
    )

    const resetUserDetails = () => {
        setCurrent({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            c_password: '',
            role: '',
            phone: '',
            address_lane_one: '',
            address_lane_two: '',
            city: '',
            state: '',
            zip: '',
            designation: '',
            experience: ''
        })
    }

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        const data = { ...current };
        data[name] = value;
        setCurrent(data);
    }

    const MessageModal = () => (
        <Modal open={ messageModal.status }>
            <div
                style={{ maxWidth: 450, maxHeight: 700 }}
                className="bg-white mx-auto my-5 rounded scrollbar p-4"
            >
                <h3 className="mb-4">{ messageModal.title }</h3>
                <p>{ messageModal.message }</p>
                <div className="d-flex my-4 justify-content-end">
                    <Button onClick={() => {
                        let data = { ...messageModal };
                        data = {
                            ...data,
                            status: false,
                            message: '',
                            title: ''
                        }
                        setMessageModal(data);
                    }} variant="contained" className="bg-secondary me-2">Close</Button>
                </div>
            </div>
        </Modal>
    )

    return (
        <>
            <div className="container">
                {
                    user.role.includes(ADMIN_ROLE) ? (
                        <div className="mt-3 d-flex justify-content-end">
                            <button onClick={() => { 
                                let data = { ...showModal };
                                data.create = true;
                                setShowModal(data);
                             }} type="button" className="btn btn-primary px-5">Add</button>
                        </div>   
                    ) : ( <></> )
                }
                <div className="d-flex justify-content-center my-5">
                    <Table 
                        columns={columns}
                        data={data}
                    />
                </div>
            </div>
            { UserDetailsModal() }
            { DeleteUserModal() }
            { MessageModal() }
        </>
    )
}