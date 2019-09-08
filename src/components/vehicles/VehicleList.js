import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import driverImage from '../../images/driver-image.png';
import ReactTooltip  from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faMapMarker,
    faAngleDown,
    faEdit,
    faOutdent
} from '@fortawesome/free-solid-svg-icons';
import { store } from 'react-notifications-component';

// Redux
import { connect } from 'react-redux';

let ref = null;

class VehicleList extends React.Component {
    state = {
        deviceList: [],
        addNotification: false
    }

    componentDidMount() {
        ref = firebase.database().ref().child('devices').orderByChild("uid").equalTo(this.props.auth.userInfo._id)
        ref.on('child_added', data => {
            let deviceList=[...this.state.deviceList, data.val()]
            this.setState({deviceList})
        })
        ref.on('child_changed', data => {
            let device = data.val()
            let devices = this.state.deviceList;
            let index = devices.findIndex(x => x.id === device.id);     
            devices[index]=device;
            this.setState({ 
                deviceList: devices, 
                addNotification: true 
            })
            // console.log(device)
            // this.state.deviceList.filter(device )
            // store.removeNotification(nextProps.popupMessage.id)
        })
    }

    componentWillUnmount(){
        ref.off()
    }

    render() { 
        const { popupMessage } = this.props;
        // console.log(popupMessage)
        let notificationMarkup = this.state.addNotification ? (store.addNotification(
            popupMessage
        )) : null;
        return (
            <Fragment> 
                {/* { notificationMarkup } */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Vehicle List</h1>
                </div>
                <div className="row">
                {this.state.deviceList.map(device => (
                    <div key={device.id} className="col-12 col-md-6 col-lg-4">
                        <div className="card shadow mb-4">
                            <a href={'#deviceCard-'+device.id} className="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExample">
                                <h6 className="m-0 font-weight-bold text-primary">{(device.registration_number)}</h6>
                                <FontAwesomeIcon icon={faAngleDown} className="vehicle-icon" />
                            </a>
                            <div className="collapse show" id={'deviceCard-'+device.id}>
                                <div className="d-flex justify-content-center mt-3">
                                    {(device.driver_photo) ? (
                                        <img className="img-fluid img-profile img-thumbnail driver-image" src={device.driver_photo} alt="Driver" />
                                    ) : (
                                        <img className="img-fluid img-profile img-thumbnail driver-image" src={driverImage} alt="Driver" />
                                    )}                                    
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Driver Name</th>
                                                <td>{device.driver_name}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Driver Phone</th>
                                                <td>{device.driver_phone}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Device Model</th>
                                                <td>{device.device_model}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Device SIM Number</th>
                                                <td>{device.device_sim_number}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Center Number</th>
                                                <td>{device.center_number}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Vehicle Type</th>
                                                <td>{device.vehicle_type}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Mileage</th>
                                                <td>{device.mileage}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                                <div className="d-block card-footer mx-auto">
                                    <button onClick={() => this.props.vehicleReport(device)} className="btn btn-success btn-circle mx-2" data-tip="View Vehicle Report">
                                        <FontAwesomeIcon icon={faOutdent} />
                                    </button>
                                    <button onClick={() => this.props.editDeviceInfo(device)} className="btn btn-primary btn-circle mx-2" data-tip="Edit Vehicle Infomation"> 
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button onClick={()=>this.props.goToVehicleLocation(device)} className="btn btn-danger btn-circle mx-2" data-tip="View Vehicle Location"> 
                                        <FontAwesomeIcon icon={faMapMarker} />
                                    </button>
                                    <ReactTooltip />
                                </div>
                        </div>
                    </div>
                ))}
                </div>
            </Fragment>
        );
    }
}

VehicleList.propTypes = {
    auth: PropTypes.object.isRequired,
    popupMessage: PropTypes.object.isRequired
    // vehicle: PropTypes.object.isRequired,
    // getVehicleList: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    popupMessage: state.popupMessage
})

const mapActionsToProps = {
    
}
 
export default connect(
    mapStateToProps,
    mapActionsToProps
)(VehicleList);