import React from 'react';
import ReactTooltip  from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faAngleDown,
    faMapMarker,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import profileImage from '../../images/profile-image.png';


class UserSingleDevice extends React.Component {

    render() { 
        return (
            
            <div className="card shadow ml-4 mr-4 mb-4">
                <a href={`#userDevice-${this.props.device._id}`} className="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls={`#userDevice-${this.props.device._id}`}>
                    <h6 className="m-0 font-weight-bold text-primary">{this.props.device.registration_number}</h6>
                    <FontAwesomeIcon icon={faAngleDown} className="vehicle-icon" />
                </a>
    
                <div className="collapse show" id={`userDevice-${this.props.device._id}`} >
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-12 col-md-3">
                                {this.props.device.driver_photo ? (
                                    <img src={this.props.device.driver_photo} className="img-thumbnail img-fluid card-img-top mx-auto" style={{ width: '150px' }} alt="Driver Profile Picture" />
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
                                            <td>{this.props.device.driver_name}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Driver Phone</th>
                                            <td>{this.props.device.driver_phone}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Device IMEI</th>
                                            <td>{this.props.device.imei}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Device Model</th>
                                            <td>{this.props.device.device_model}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Device SIM</th>
                                            <td>{this.props.device.device_sim_number}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Center Number</th>
                                            <td>{this.props.device.center_number}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <button onClick={() => this.props.deviceViewInMap(this.props.device)} className="btn btn-primary btn-circle mx-2" data-tip="View in Map" data-toggle="modal" data-target=".bd-example-modal-xl"> 
                            <FontAwesomeIcon icon={faMapMarker} />
                        </button>
                        <button onClick={() => this.props.deleteDevice(this.props.device)} className="btn btn-danger btn-circle mx-2" data-tip="Delete this device"> 
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <ReactTooltip />
                    </div>
                </div>
            </div>
        )
    }
}
 
export default UserSingleDevice;