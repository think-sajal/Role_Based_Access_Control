import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

export function Login() {
    const { isLoading, error, loginWithRedirect, getIdTokenClaims } = useAuth0();
    useEffect(() => {
        (async function () {
            if (!localStorage.getItem('token')) {
                const token = await getIdTokenClaims();
                if (token) {
                    localStorage.setItem('token', token.__raw);
                }
            }
        })();
    });

    return (
        <div className='bg-primary d-flex align-items-center h-100'>
            { 
                isLoading ? 
                    ( <div className='text-white text-center w-100 display-5'>Loading...</div> ) : 
                error ?
                    <>
                        { localStorage.clear() }
                        <div className='text-white text-center w-100 display-5'>Oops... {error.message}</div> 
                    </>
                :
                <div className="container bg-white border border-primary d-flex align-items-center flex-column" style={{ maxHeight: "300px", maxWidth: "800px", borderRadius: "10px" }}>
                    { localStorage.clear() }
                    <h1 className="my-5">Welcome</h1>
                    <Button className='m-5' variant="contained" color="primary" onClick={() => loginWithRedirect()}>Login</Button>
                </div> 
            }
        </div>
    );
};
