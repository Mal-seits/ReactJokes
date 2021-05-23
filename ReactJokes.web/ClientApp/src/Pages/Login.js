import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useUserContext } from '../UserContext';
import getAxios from '../AuthAxios';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    let { email, password } = formData;
    const [isValid, setIsValid] = useState(true);
    const history = useHistory();
    const { setUser } = useUserContext();
    const [disable, setDisable] = useState(false);

    const onTextChange = e => {
        let formDataCopy = { ...formData };
        formDataCopy[e.target.name] = e.target.value;
        setFormData(formDataCopy);
    }

    const onFormSubmit = async e => {
        try {
            e.preventDefault();
    
            let disableButton = true;
            setDisable(disableButton);

            const { data } = await getAxios().post('/api/account/login', formData);
            let isValidCopy = !!data;
            setIsValid(isValidCopy);
            if (isValidCopy) {
                history.push(`/`);
            }
    
            localStorage.setItem('user-token', data.token);
            const user = await getAxios().get('/api/account/getcurrentuser');
            setUser(user.data);
    
            disableButton = false;
            setDisable(disableButton);
        } 
        catch (e) {
            setIsValid(false);
            
        }

    }
    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Log in to your account</h3>
                {!isValid && <span>Sorry, our system does not recongnize that email/password combo. It is not a mistake on our part. Please try again</span>}
                <form onSubmit={onFormSubmit}>
                    <input onChange={onTextChange} value={formData.email} type="text" name="email" placeholder="Email" className="form-control" value= {email}/>
                    <br />
                    <input onChange={onTextChange} value={formData.password} type="password" name="password" placeholder="Password" className="form-control" value={password} />
                    <br />
                    <button disabled={disable} className="btn btn-primary">Log me in please!</button>
                </form>
                <Link to="/signup">Don't have an account? That's what the signup button up there was for...</Link>
            </div>
        </div>
    )
}
export default Login;