import React from 'react';
import PropTypes from 'prop-types';
import { LoginTextInputGroup } from '../../utils';
// Redux
import { connect } from 'react-redux';
import { resigterUser } from '../../redux/actions/UserAction';


class UserRegistration extends React.Component {
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

    registerHandler = () => {
        if(this.state.email === '') {
            this.setState({errors: {email: 'Email is Required'}})
            return;
        }

        if(!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email))){
            this.setState({errors: {email: 'Valid Email is Required'}})
            return;
        }

        if(this.state.password === '') {            
            this.setState({errors: {password: 'Password is Required'}})
            return;
        }
        this.props.resigterUser(this.state.email, this.state.password);
        this.props.changePage();
    }

    render() { 
        return (
            <div className="col-lg-6">
                <div className="p-5">
                    <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                    </div>
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
                            placeholder="Enter Password..."
                            value={this.state.password}
                            onChange={this.changeHandler} 
                            error={this.state.errors.password}
                        />
                            
                        <button onClick={this.registerHandler} className="btn btn-success btn-user btn-block">
                            Register Account
                        </button>
                        <br/>                                                              
                    <div className="text-center">
                        <button onClick={this.pageHandler} className="btn btn-primary btn-user btn-block">Already have an account? Login!</button>
                    </div>
                </div>
            </div>
        );
    }
}

UserRegistration.propTypes = {
    user: PropTypes.object.isRequired,
    resigterUser: PropTypes.func.isRequired
}

const matpStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    resigterUser
}
 
export default connect(
    matpStateToProps,
    mapActionsToProps
)(UserRegistration);