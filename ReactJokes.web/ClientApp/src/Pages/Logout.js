import React, { useEffect } from 'react';
import { useUserContext } from '../UserContext';
import { useHistory } from 'react-router-dom';

const Logout = () => {

    const { logout } = useUserContext();
    const history = useHistory();
    useEffect(() => {
        const actuallyLogout = async () => {
            logout();
            history.push('/');
        }
        actuallyLogout();
    }, [])
    return(<> </>)

}
export default Logout;