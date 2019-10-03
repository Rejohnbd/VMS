import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHdd,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { checkAssignedDevice, checkUnassignedDevice } from '../../utils/Utils'
// Redux
import { connect } from "react-redux";
import { getUsers } from '../../redux/actions/UserAction';
import { getDevices } from '../../redux/actions/DeviceAction';

class AdminDashboard extends React.Component {
    state = {  }

    selectUserList = () => {
        this.props.changeAdminState('USERS_LIST');
    }

    selectDeviceList = () => {
        this.props.changeAdminState('DEVICES_LIST');
    }

    componentDidMount() {
        if(this.props.devices.length === 0 && this.props.users.length === 0) {
            console.log('Called Admin Dashboard API')
            this.props.getUsers();
            this.props.getDevices();
        }
        console.log('Not Called Admin Dashboard API')
        
    }
    render() { 
        const { users, devices } = this.props;
        let loader = <Loader type="ThreeDots" color="#4e73df" height={20} width={100} />
        let assignDevices = checkAssignedDevice(devices);
        let unassignDevices = checkUnassignedDevice(devices);
        let devicesInfo = (devices.length === 0) ? loader: devices.length;
        let assignDevicesInfo = (assignDevices.length === 0) ? loader : assignDevices.length;
        let unassignDevicesInfo = (unassignDevices.length === 0) ? loader : unassignDevices.length;
        let usersInfo = (users.length === 0) ? loader : users.length;

        return (
            <Fragment>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                    <button  className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                        <i className="fas fa-download fa-sm text-white-50"></i> Generate Report
                    </button>
                </div>

                <div className="row">
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Devices</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{devicesInfo}</div>
                                    </div>
                                    <div className="col-auto">
                                        <FontAwesomeIcon icon={faHdd} />
                                    </div>
                                </div>
                            </div>
                            <button className="ml-2 mr-2 btn btn-sm btn-primary" onClick={this.selectDeviceList} >Details →</button>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Assigned Devices</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{assignDevicesInfo}</div>
                                    </div>
                                    <div className="col-auto">
                                        <FontAwesomeIcon icon={faHdd} />
                                    </div>
                                </div>
                            </div>
                            <button className="ml-2 mr-2 btn btn-sm btn-success" onClick={this.selectUserList} >Details →</button>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-info shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Unassign Devices</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{unassignDevicesInfo}</div>
                                    </div>
                                    <div className="col-auto">
                                        <FontAwesomeIcon icon={faHdd} />
                                    </div>
                                </div>
                            </div>
                            <button className="ml-2 mr-2 btn btn-sm btn-info" onClick={this.selectUserList} >Details →</button>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-warning shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Total Users</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{usersInfo}</div>
                                    </div>
                                    <div className="col-auto">
                                        <FontAwesomeIcon icon={faUsers} />
                                    </div>
                                </div>
                            </div>
                            <button className="ml-2 mr-2 btn btn-sm btn-warning" onClick={this.selectUserList} >Details →</button>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Devices</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                            <a className="ml-3" target="_blank" rel="nofollow" href="https">Details →</a>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Active Devices</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                            <a className="ml-3" target="_blank" rel="nofollow" href="https">Details →</a>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-info shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Inactive Devices</div>
                                        <div className="row no-gutters align-items-center">
                                            <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                            </div>
                                            <div className="col">
                                            <div className="progress progress-sm mr-2">
                                                <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                            <a className="ml-3" target="_blank" rel="nofollow" href="https">Details →</a>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-warning shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Total Users</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                            <a className="ml-3" target="_blank" rel="nofollow" href="https">Details →</a>
                        </div>
                    </div>
                </div> */}
            </Fragment>
        );
    }
}

AdminDashboard.propTypes = {
    getUsers: PropTypes.func.isRequired,
    getDevices: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    devices: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    users: state.user.users,
    devices: state.device.devices,
})

const mapActionToProps = {
    getUsers,
    getDevices
}
 
export default connect(
    mapStateToProps,
    mapActionToProps
)(AdminDashboard);