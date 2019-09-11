import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// Redux
import { connect } from 'react-redux';
import { getUsers, sendAdminNotification } from '../../redux/actions/UserAction';

class Notification extends React.Component {
    state = {
        email: '',
        title: '',
        message: '',
        emailError: false,
        titleError: false,
        messageError: false
     }

    componentDidMount(){
        this.props.getUsers()
    }

    changeHandler = (e) => {
        e.preventDefault();
        // let message = this.state.message
        // message[e.target.name]=e.target.value
        this.setState({ 
            [e.target.name] : e.target.value,
            emailError: false,
            titleError: false,
            messageError: false
        })
    }

    sendNotification = (e) => {
        e.preventDefault();
        if(this.state.email === '') {
            this.setState({ emailError: true })
            return;
        }

        if(this.state.title === ''){
            this.setState({ titleError: true })
            return;
        }

        if(this.state.message === ''){
            this.setState({ messageError: true })
            return;
        }

        const newNotification = {
            email: this.state.email,
            title: this.state.title,
            message: this.state.message
        }

        this.props.sendAdminNotification(newNotification)

        this.setState({
            email: '',
            title: '',
            message: ''
        })
    }

    render() { 
        const { users } = this.props;
        const { emailError, titleError, messageError } = this.state;
        const notificationEmailTypeError = emailError ? ('is-invalid'): null;
        const notificationTitleTypeError = titleError ? ('is-invalid'): null;
        const notificationMessageTypeError = messageError ? ('is-invalid'): null;
    
        // console.log(users);
        return (
            <Fragment>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    {/* <h1 className="h3 mb-0 text-gray-800">Vehicle Location</h1> */}
                </div>
                <div className="card shadow mb-4" >
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-center text-primary">NOTIFICATION SEND TO USER</h6>
                    </div>
                    <div className="card-body" >
                        <div className="form-group">
                            <label htmlFor="selectUser">Select User</label>
                            <select 
                                className={`form-control ${notificationEmailTypeError}` }
                                name="email" 
                                id="selectUser"
                                onChange={this.changeHandler}
                                value={this.state.message.email}
                            >
                                <option value=''>Select Your User</option>
                                {users.map(user=><option key={user._id} value={user.email} >{user.email}</option>)}
                            </select>
                            {emailError ? (<div className="invalid-feedback">Please Select User</div>) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="notificationTitle">Notification Title</label>
                            <input 
                                type="text" 
                                name="title" 
                                className={`form-control ${notificationTitleTypeError}` }
                                id="notificationTitle" 
                                placeholder="Notification Title"                                
                                onChange={this.changeHandler}
                                value={this.state.message.title}
                            />
                            {titleError ? (<div className="invalid-feedback">Notification Title is Required.</div>) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="notificationMessage">Message</label>
                            <textarea 
                                className={`form-control ${notificationMessageTypeError}` }
                                name="message"
                                placeholder="Write the Message" 
                                id="notificationMessage" 
                                rows="8"
                                onChange={this.changeHandler}
                                value={this.state.message.message}
                            />
                            {messageError ? (<div className="invalid-feedback">Notification Message is Required.</div>) : null}
                        </div>
                    <button onClick={this.sendNotification} className="btn btn-success btn-block">Send Notification</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

Notification.propsTypes = {
    users: PropTypes.array.isRequired,
    getUsers: PropTypes.func.isRequired,
    sendAdminNotification: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    users: state.user.users
})

const mapActionToProps = {
    getUsers,
    sendAdminNotification
}
 
export default connect(
    mapStateToProps,
    mapActionToProps
)(Notification);