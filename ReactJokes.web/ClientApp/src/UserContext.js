import getAxios from './AuthAxios';
import React, { useState, createContext, useContext, useEffect } from 'react';

const UserContext = createContext();

const UserContextComponent = ({ children }) => {
    const [user, setUser] = useState();
   
    useEffect(() => {
        const getCurrentUser = async () => {
            const { data } =  await getAxios().get('/api/account/getcurrentuser');
            setUser(data); 
        }
        getCurrentUser();
    }, [])

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user-token');
    }

    return (
        <UserContext.Provider value={{ user, logout, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

const useUserContext = () => useContext(UserContext);
export { UserContextComponent, useUserContext }