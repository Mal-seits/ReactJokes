import React from 'react';
import { Route } from 'react-router';
import Layout from './Components/Layout';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import {UserContextComponent} from './UserContext';
import ViewAll from './Pages/ViewAll';
import Logout from './Pages/Logout';

const App = () => {
    return (
        <UserContextComponent>
            <Layout>
                <Route exact path='/Signup' component={Signup}></Route>
                <Route exact path='/Login' component={Login}></Route>
                <Route exact path ='/' component={Home}></Route>
                <Route exact path ='/ViewAll' component={ViewAll}></Route>
                <Route exact path ='/Logout' component={Logout}></Route>
            </Layout>
        </UserContextComponent>

    )
}
export default App;