import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { UnassignDeviceModal } from '../devices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPhoneSquareAlt,
    faAddressBook,
    faUniversity,
    faEnvelope,
    faAngleDown,
    faMapMarker,
    faTrash,
    faHdd
} from '@fortawesome/free-solid-svg-icons';
import ReactTooltip  from 'react-tooltip';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import '../../../node_modules/sweetalert2/dist/sweetalert2.css';
import profileImage from '../../images/profile-image.png';
// Redux
import { connect } from 'react-redux';
import { getUserDevice, unAssignUserDevice, assignedDeviceToUser } from '../../redux/actions/UserAction';
import { getUnassignDevices } from '../../redux/actions/DeviceAction';

class UserDetails extends React.Component {
    state = {
        modalIsOpen: false
    }

    componentDidMount() {
        this.props.getUserDevice(this.props.user._id);
    }

    openModal = () => {
        this.props.getUnassignDevices();
        this.setState({ modalIsOpen: true })
    }
    
    modalClose = () => {
        this.setState({ modalIsOpen: false })
    }

    assignDeviceHandler = (imei) => {
        let data = {
            uid: this.props.user._id,
            imei: imei
        }
        this.props.assignedDeviceToUser(data);
        Swal.fire({
            type: 'success',
            title: 'Device Assign Successfully',
            showConfirmButton: false,
            timer: 1500
        })
        this.setState({ modalIsOpen: false })
    }

    deleteDevice = (device) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to remove this device from this User?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
                this.props.unAssignUserDevice(device);
                Swal.fire(
                    'Removed!',
                    'Device Removed Successfully',
                    'success'
                )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'Nothing Changed',
                'error'
              )
            }
          })
    }

    deleteFile = () => {
        console.log('called')
    }

    onCancel = () => {
        this.setState({ deleteDevice: false })
    }

    render() { 
        const { name, image, email, contact, address, organization_name } = this.props.user;
        const { devices, unassignDevices } = this.props;

        console.log(devices, unassignDevices, 'From Redux')
        return (
            <Fragment>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">&nbsp;</h1>
                    <button  className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={this.openModal}>
                        <FontAwesomeIcon icon={faHdd} /> Assing New Device
                    </button>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <div className="card shadow text-center">
                            <div className="card-header text-capitalize">
                                <h5 className="text-primary">{name}</h5>
                            </div>
                                { (image) ? (
                                    <img src={image} className="img-thumbnail img-fluid card-img-top mx-auto" style={{ width: '200px' }} alt="User Profile Picture" />
                                ) : (
                                    <img src={profileImage} className="img-thumbnail img-fluid card-img-top mx-auto" style={{ width: '200px' }} alt="User Profile Picture" />
                                ) }
                                <ul className="list-group list-group-flush text-left">
                                    <li className="list-group-item">
                                        <FontAwesomeIcon icon={faEnvelope} className="text-primary" /> {email}
                                    </li>
                                    <li className="list-group-item">
                                        <FontAwesomeIcon icon={faPhoneSquareAlt} className="text-primary" /> {contact}
                                    </li>
                                    <li className="list-group-item">
                                        <FontAwesomeIcon icon={faAddressBook} className="text-primary" /> {address}
                                    </li>
                                    <li className="list-group-item">
                                        <FontAwesomeIcon icon={faUniversity} className="text-primary" /> {organization_name}
                                    </li>
                                </ul>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-8">
                        <div className="card shadow mb-4" >
                            <div className="card-header py-3 mb-4">
                                <h6 className="m-0 font-weight-bold text-center text-primary">
                                    USES DEVICE <span className="badge badge-success badge-pill">{devices.length}</span>
                                </h6>
                            </div>
                            {devices.length === 0 ? (
                                <div className="alert alert-danger" role="alert">
                                    Device Not Assigned For This User.
                                </div>
                            ): (
                                devices.map(device => 
                                    <div className="card shadow ml-4 mr-4 mb-4" key={device._id}>
                                        <a href={`#userDevice-${device._id}`} className="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls={`#userDevice-${device._id}`}>
                                            <h6 className="m-0 font-weight-bold text-primary">{device.registration_number}</h6>
                                            <FontAwesomeIcon icon={faAngleDown} className="vehicle-icon" />
                                        </a>
                            
                                        <div className="collapse show" id={`userDevice-${device._id}`} >
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-3">
                                                        {device.driver_photo ? (
                                                            <img src={device.driver_photo} className="img-thumbnail img-fluid card-img-top mx-auto" style={{ width: '150px' }} alt="Driver Profile Picture" />
                                                        ) : (
                                                            <img src={profileImage} className="img-thumbnail img-fluid card-img-top mx-auto" style={{ width: '150px' }} alt="Driver Profile Picture" />
                                                        )}
                                                        <p className="text-center">Driver Image</p>
                                                    </div>
                                                    <div className="col-sm-12 col-md-8">
                                                        <table className="table table-bordered">
                                                            <tbody>
                                                                <tr>
                                                                    <th colSpan={2} className="text-center">Device Infomation</th>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Driver Name</th>
                                                                    <td>{device.driver_name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Driver Phone</th>
                                                                    <td>{device.driver_phone}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Device IMEI</th>
                                                                    <td>{device.imei}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Device Model</th>
                                                                    <td>{device.device_model}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Device SIM</th>
                                                                    <td>{device.device_sim_number}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Center Number</th>
                                                                    <td>{device.center_number}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer text-center">
                                            <button className="btn btn-primary btn-circle mx-2" data-tip="View in Map"> 
                                                    <FontAwesomeIcon icon={faMapMarker} />
                                                </button>
                                                <button onClick={this.deleteDevice.bind(this, device)} className="btn btn-danger btn-circle mx-2" data-tip="Delete this device"> 
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                                <ReactTooltip />
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
                <UnassignDeviceModal devices={unassignDevices} modalIsOpen={this.state.modalIsOpen} modalClose={this.modalClose} assignDevice={this.assignDeviceHandler} />
            </Fragment>
        );
    }
}

UserDetails.propTypes = {
    getUserDevice: PropTypes.func.isRequired,
    unAssignUserDevice: PropTypes.func.isRequired,
    getUnassignDevices: PropTypes.func.isRequired,
    assignedDeviceToUser: PropTypes.func.isRequired,
    devices: PropTypes.array.isRequired,
    unassignDevices: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    devices: state.user.devices,
    unassignDevices: state.device.unassignDevices
})

const mapActionToProps = {
    getUserDevice,
    unAssignUserDevice,
    getUnassignDevices,
    assignedDeviceToUser
}
 
export default connect(
    mapStateToProps,
    mapActionToProps
)(UserDetails);