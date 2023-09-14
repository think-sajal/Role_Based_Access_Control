import { useAuth0 } from "@auth0/auth0-react";
import { Button, Modal } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Api } from "../helper/Api";

export function Settings() {
    const { user } = useAuth0();
    const [edit, setEdit] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [current, setCurrent] = useState({});
    const [messageModal, setMessageModal] = useState({
        status: false,
        message: '',
        title: ''
    });

    useEffect(() => {
        const getUserData = async () => {
            const res = await Api.getUser( user.sub );
            setCurrent(res.data);
            setUserDetails(res.data);
        };      
        getUserData();
    }, [])

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        let data = { ...current };
        data[name] = value;
        setCurrent(data);
    }

    const updateEdit = async () => {
        if (!edit) {
            setEdit(!edit)
        } else {
            const res = await Api.updateUser(user.sub, current);
            if (res.data.status === 'success') {
                setMessageModal({
                    status: true,
                    message: 'User updated successfully',
                    title: 'Update Success'
                })
                setEdit(!edit)
                setUserDetails(current);
            } else {
                setMessageModal({
                    status: true,
                    message: res.data.message,
                    title: 'Update Failed'
                })
            }
        }
    };

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
            <div className="container d-flex flex-column">
                <h2 className="my-4">Settings</h2>
                <form>
                    <div className="form-group mt-4 row">
                        <div className="col">
                            <label className="fw-bold">First Name</label>
                            <input type="text" className="form-control" name="first_name" onChange={handleOnChange} value={current?.first_name} disabled={!edit}/>
                        </div>
                        <div className="col">
                            <label className="fw-bold">Last Name</label>
                            <input type="text" className="form-control" name="last_name" onChange={handleOnChange} value={current?.last_name} disabled={!edit}/>
                        </div>
                        <div className="col">
                            <label className="fw-bold">Email</label>
                            <input type="email" className="form-control" name="email" onChange={handleOnChange} value={current?.email} disabled/>
                        </div>
                    </div>
                    <div className="form-group mt-4 row">
                        <div className="col">
                            <label className="fw-bold">Role</label>
                            <input type="text" className="form-control" name="role" onChange={handleOnChange} value={current?.role} disabled={!edit}/>
                        </div>
                        <div className="col">
                            <label className="fw-bold">Phone</label>
                            <input type="text" className="form-control" name="phone" onChange={handleOnChange} value={current?.phone} disabled={!edit}/>
                        </div>
                    </div>
                    <div className="form-group mt-4 row">
                        <div className="col">
                            <label className="fw-bold">Address 1</label>
                            <input type="text" className="form-control" name="address_lane_one" onChange={handleOnChange} value={current?.address_lane_one} disabled={!edit}/>
                        </div>
                        <div className="col">
                            <label className="fw-bold">Address 2</label>
                            <input type="text" className="form-control" name="address_lane_two" onChange={handleOnChange} value={current?.address_lane_two} disabled={!edit}/>
                        </div>
                    </div>
                    <div className="form-group mt-4 row">
                        <div className="col">
                            <label className="fw-bold">City</label>
                            <input type="text" className="form-control" name="city" onChange={handleOnChange} value={current?.city} disabled={!edit}/>
                        </div>
                        <div className="col">
                            <label className="fw-bold">State</label>
                            <input type="text" className="form-control" name="state" onChange={handleOnChange} value={current?.state} disabled={!edit}/>
                        </div>
                        <div className="col">
                            <label className="fw-bold">Zip</label>
                            <input type="text" className="form-control" name="zip" onChange={handleOnChange} value={current?.zip} disabled={!edit}/>
                        </div>
                    </div>
                    <div className="form-group mt-4 row">
                        <div className="col">
                            <label className="fw-bold">Designation</label>
                            <input type="text" className="form-control" name="designation" onChange={handleOnChange} value={current?.designation} disabled={!edit}/>
                        </div>
                        <div className="col">
                            <label className="fw-bold">Experience</label>
                            <input type="text" className="form-control" name="experience" onChange={handleOnChange} value={current?.experience} disabled={!edit}/>
                        </div>
                    </div>
                </form>
                <button
                    type="button"
                    className="btn btn-primary mx-auto my-4"
                    onClick={() => { updateEdit() }}
                >
                    { edit ? 'Save' : 'Edit' } 
                </button>
            </div>
            { MessageModal() }
        </>
    );
}
