  
import axios from 'axios';

const getAxios = () => {
    const headers = {};
    const token = localStorage.getItem('user-token');
    headers['Authorization'] = `Bearer ${token}`;
    return axios.create({
        headers
    });

}
export default getAxios;