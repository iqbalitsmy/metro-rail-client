import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {

        const fetchData = async () => {
            // Make a GET request with cookies using fetch
            try {
                const { data } = await axios.get('http://localhost:3000/api/v1/me', {
                    withCredentials: true, // Include credentials (cookies) in the request
                })
                setUserInfo(data.user);
            } catch (error) {
                setUserInfo({})
                console.log("Error :", error)
            }
        }
        fetchData()
    }, [])

    
    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;