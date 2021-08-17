import React, { Fragment, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import {login} from '../../actions/auth';
import {setAlert} from '../../actions/alert';
import { Register } from './Register';

export const Login = ({setAlert, login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value}); //the [e.target.name] allows for dynamic changing of variables

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);

    }

    // Redirect if logged in
    if(isAuthenticated) {
        return <Redirect to="/dashboard"/>;
    }
    
    return (
        <Fragment>
                <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sing Into Your Account</p>
            <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email"
                value = {email}
                onChange = {(e) => onChange(e)} />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value = {password}
                    onChange = {e => onChange(e)}
                />
                </div>
                
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Need an account? <Link to="/register">Register</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login, setAlert})(Login);