import React, { useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    let { firstName, lastName, email, password } = formData;
    const history = useHistory();

    const onTextChange = e => {
        let formDataCopy = { ...formData };
        formDataCopy[e.target.name] = e.target.value;
        setFormData(formDataCopy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        axios.post('/api/account/signup', formData);
        history.push('/login');
    }

    return (
        <div className="col-md-6 offset-md-3 card card-body bg-light">
            <h3>Sign up to join this HILARIOUS site!</h3>
            <form onSubmit={onFormSubmit}>
                <input onChange={onTextChange} type="text" name="firstName" placeholder="First Name" className="form-control" value={firstName} />
                <br />
                <input onChange={onTextChange} type="text" name="lastName" placeholder="Last Name" className="form-control" value={lastName} />
                <br />
                <input onChange={onTextChange} type="text" name="email" placeholder="Email" className="form-control" value={email} />
                <br />
                <input onChange={onTextChange} type="password" name="password" placeholder="Password" className="form-control" value={password} />
                <br />
                <button className="btn btn-primary">Sign me up!</button>
            </form>
        </div>
    )
}
export default Signup;