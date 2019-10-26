import React from 'react';
import PropTypes from 'prop-types';
import profileImage from '../../images/profile-image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser, 
    faPhoneSquareAlt,
    faAddressBook,
    faUniversity,
    faEnvelope,
    faHdd
} from '@fortawesome/free-solid-svg-icons';
// Redux
import {connect} from 'react-redux';

class DeviceDetails extends React.Component {
    state = {  }
    render() {
        let device = this.props.device;
        let users = this.props.users;
        let userData = users.filter(user => user._id === device.uid);
        let user =  {};
        userData.map(userIfo=> {
            user = userIfo
        })
        return (
            <div className="card shadow mb-4" >
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-center text-primary">DEVICES DETAILS</h6>
                </div>
                <div className="row px-2">
                    <div className="col-md-12 col-lg-4 my-2">
                        <div className="card shadow text-center">
                            <div className="card-header text-capitalize">
                                <h5 className="text-primary text-capitalize">Device Infomation</h5>
                            </div>
                            <div className="card-body">
                                <FontAwesomeIcon icon={faHdd} size="6x" className="text-success"/>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Device IMEI</th>
                                            <td>{device.imei}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Registration Number</th>
                                            <td>{device.registration_number}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">SIM Number</th>
                                            <td>{device.device_sim_number}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Center Number</th>
                                            <td>{device.center_number}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Device Model</th>
                                            <td>{device.device_model}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Vehicle Type</th>
                                            <td>{device.vehicle_type}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 my-2">
                        <div className="card shadow text-center">
                            <div className="card-header">
                                <h5 className="text-primary text-capitalize">User Infomation</h5>
                            </div>
                            { (user.image) ? (
                                <img src={user.image} className="img-thumbnail img-fluid card-img-top mx-auto" style={{ width: '200px' }} alt="User Profile Picture" />
                            ) : (
                                <img src={profileImage} className="img-thumbnail img-fluid card-img-top mx-auto" style={{ width: '200px' }} alt="User Profile Picture" />
                            ) }
                            <ul className="list-group list-group-flush text-left">
                                <li className="list-group-item">
                                    <FontAwesomeIcon icon={faUser} className="text-primary" /> {user.name}
                                </li>
                                <li className="list-group-item">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-primary" /> {user.email}
                                </li>
                                <li className="list-group-item">
                                    <FontAwesomeIcon icon={faPhoneSquareAlt} className="text-primary" /> {user.contact}
                                </li>
                                <li className="list-group-item">
                                    <FontAwesomeIcon icon={faAddressBook} className="text-primary" /> {user.address}
                                </li>
                                <li className="list-group-item">
                                    <FontAwesomeIcon icon={faUniversity} className="text-primary" /> {user.organization_name}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 my-2">
                        <div className="card shadow text-center">
                            <div className="card-header">
                                <h5 className="text-primary text-capitalize">Driver Infomation</h5>
                            </div>
                            { (device.driver_photo) ? (
                                <img src={device.driver_photo} className="img-thumbnail img-fluid card-img-top mx-auto" style={{ width: '200px' }} alt="User Profile Picture" />
                            ) : (
                                <img src={profileImage} className="img-thumbnail img-fluid card-img-top mx-auto" style={{ width: '200px' }} alt="User Profile Picture" />
                            ) }
                            <ul className="list-group list-group-flush text-left">
                                <li className="list-group-item">
                                    <FontAwesomeIcon icon={faUser} className="text-primary" /> {device.driver_name}
                                </li>
                                <li className="list-group-item">
                                    <FontAwesomeIcon icon={faPhoneSquareAlt} className="text-primary" /> {device.driver_phone}
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

DeviceDetails.propTypes = {
    users: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    users: state.user.users
})
 
export default connect(
    mapStateToProps,
    null
)(DeviceDetails);