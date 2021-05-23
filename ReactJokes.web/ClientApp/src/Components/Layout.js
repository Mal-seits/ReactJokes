import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../UserContext';

const Layout = ({ children }) => {

    const { user } = useUserContext();
    const isLoggedIn = !!user;

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                    <div className="container">
                        <Link to='/' className="navbar-brand"> JOKES SITE </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                {!!isLoggedIn && <>
                                    <li className="nav-item"><Link to="/" className='nav-link text-light'>Home</Link></li>
                                    <li className="nav-item"><Link to="/ViewAll" className='nav-link text-light'>View All Jokes!</Link></li>
                                    <li className="nav-item"><Link to="/Logout" className='nav-link text-light'>Logout :-(</Link></li>
                                </>}
                                {!isLoggedIn && <>
                                    <li className="nav-item"><Link to="/Signup" className='nav-link text-light'>Signup Here!</Link></li>
                                    <li className="nav-item"><Link to="/login" className='nav-link text-light'>Login Here!</Link></li>
                                </>}
                            </ul>

                        </div>
                    </div>
                </nav>
            </header>
            <div className="container" style={{ marginTop: 60 }}>
                {children}
            </div>
        </div>
    )
}

export default Layout;