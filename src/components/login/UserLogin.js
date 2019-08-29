import React from 'react';
import PropTypes from 'prop-types';
import { LoginTextInputGroup } from '../../utils';
// Redux
import { connect } from 'react-redux';
import { userLogin } from '../../redux/actions/UserAction';

class UserLogin extends React.Component {
    state = {
        email: '',
        password: '',
        errors: {}
    }

    changeHandler = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    pageHandler = () => {
        this.props.changePage();
    }

    loginHandler = (e) => {
        e.preventDefault();
        if(this.state.email === '') {
            this.setState({errors: {email: 'Email is Required'}})
            return;
        }

        if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))){
            this.setState({errors: {email: 'Valid Email is Required'}})
            return;
        }

        if(this.state.password === '') {            
            this.setState({errors: {password: 'Password is Required'}})
            return;
        }

        this.props.userLogin(this.state.email, this.state.password);
    }

    render() { 
        return (
            <div className="col-lg-6">
                <div className="p-5">
                    <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <div className="user">
                        <LoginTextInputGroup
                            name="email"
                            type="email"
                            placeholder="Enter Email Address..."
                            value={this.state.email}
                            onChange={this.changeHandler}
                            error={this.state.errors.email}
                        />
                        <LoginTextInputGroup
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.changeHandler}
                            error={this.state.errors.password}
                        />
                        <button onClick={this.loginHandler} className="btn btn-success btn-user btn-block">
                            Login
                        </button>
                        <br/>
                    </div>                                                                     
                    <div className="text-center">
                        <button className="btn btn-danger btn-user btn-block" >Login with Google</button>
                        <br/>
                    </div>
                    <div className="text-center">
                        <button onClick={this.pageHandler} className="btn btn-primary btn-user btn-block">Create an Account!</button>
                        <br/>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-warning btn-user btn-block" >Forgot Password?</button>
                    </div>
                </div>
            </div>
        );
    }
}

UserLogin.propTypes = {
    user: PropTypes.object.isRequired,
    userLogin: PropTypes.func.isRequired
}

const mapActionsToProps = {
    userLogin
}

const mapStateToProps = (state) => ({
    user: state.user
})
 
export default connect(
    mapStateToProps,
    mapActionsToProps
)(UserLogin);