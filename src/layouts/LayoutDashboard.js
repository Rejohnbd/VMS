import React from 'react';
import PropTypes from 'prop-types';
import { AdminTopbar, UserTopbar, AdminSidebar, UserSidebar, Footer } from './index'
import { AdminDashboard, UserDashboard } from '../components/dashboard';
import { DeviceList, AssignDeviceList, UnAssignDeviceList, AddDevice, DeviceDetails  } from '../components/devices';
import { VehicleList, EditVehicle, VehicleReport } from '../components/vehicles';
import { VehicleLocation } from '../components/location';
import { UserProfile, AdminProfile } from '../components/profile';
import { UserList, UserDetails } from '../components/users';
import { Notification } from '../components/notification';

// Redux
import { connect } from 'react-redux';
import { editVehicleInfo } from '../redux/actions/VehicleAction';
import {  } from '../redux/actions/UserAction';


class LayoutDashboard extends React.Component {
    state = {
        device: null,
        user: null,
        adminState: '',
        userState: ''
    }

    adminStateHandler = (stateStatus) => {
        this.setState({ adminState: stateStatus })
    }

    goToUserDetailsHandler = (user) => {
        this.setState({ user: user, adminState: 'USER_DETAILS' })
    }

    goToDeviceDetailsHandler = (device) => {
        this.setState({ device: device, adminState: 'DEVICE_DETAILS' })
    }

    adminSateRender = () => {
        switch(this.state.adminState){
            case 'ADMIN_DASHBOARD':
                return <AdminDashboard 
                changeAdminState={this.adminStateHandler}
                />
            case 'USERS_LIST':
                return <UserList
                goToUserDetails = {this.goToUserDetailsHandler}
                />
            case 'USER_DETAILS':
                return <UserDetails 
                user = {this.state.user} 
                />
            case 'DEVICES_LIST':
                return <DeviceList
                goToDeviceDetails = {this.goToDeviceDetailsHandler}
                />
            case 'ASSIGN_DEVICES_LIST':
                return <AssignDeviceList
                goToDeviceDetails = {this.goToDeviceDetailsHandler}
                />
            case 'UNASSIGN_DEVICES_LIST':
                return <UnAssignDeviceList
                goToDeviceDetails = {this.goToDeviceDetailsHandler}
                />
            case 'DEVICE_DETAILS':
                return <DeviceDetails
                device = {this.state.device}
                />
            case 'ADD_DEVICE':
                return <AddDevice />
            case 'ADMIN_PROFILE':
                return <AdminProfile />
            case 'SEND_NOTIFICATION':
                return <Notification />
            default:
                return <AdminDashboard 
                changeAdminState={this.adminStateHandler}
                />
        }
    }

    // User Sidebar Action
    userStateHandler = (stateStatus) => {
        this.setState({ userState: stateStatus })
    }

    vehicleLocationHandler = (devices) => {
        this.setState({ device: devices, userState: 'VEHICLE_LOCATION' })
    }

    editDeviceInfoHandler = (device) => {
        this.props.editVehicleInfo(device);
        this.setState({ userState: 'EDIT_VEHICLE' })
    }

    vehicleReportHandler = (device) => {
        // Add Redux action for Report Data
        this.setState({ userState: 'VEHICLE_REPORT' })
    }

    userStateRender = () => {
        switch(this.state.userState){
            case 'USER_DASHBOARD':
                return <UserDashboard />
            case 'VEHICLES_LIST':
                return <VehicleList
                    goToVehicleLocation = {this.vehicleLocationHandler}
                    editDeviceInfo = {this.editDeviceInfoHandler}
                    vehicleReport = {this.vehicleReportHandler}
                    />
            case 'VEHICLE_LOCATION':
                return <VehicleLocation device = {this.state.device} />
            case 'EDIT_VEHICLE':
                return <EditVehicle
                    changeUserState = {this.userStateHandler}
                    />
            case 'VEHICLE_REPORT':
                return <VehicleReport />
            case 'USER_PROFILE':
                return <UserProfile />
            default: 
                return <UserDashboard />
        }
    }

    render() {
        const { userType  } = this.props.auth; 
        // const { userType } = this.props.user.userType; 
        return (
            <div id='wrapper'>
                { userType === 'admin' 
                  ? <AdminSidebar 
                        changeAdminState={this.adminStateHandler}
                        logoutUser={this.props.logoutUser}
                    />
                  : <UserSidebar 
                        changeUserState={this.userStateHandler} 
                        logoutUser={this.props.logoutUser}
                    />
                }
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        { userType === 'admin' 
                            ?  <AdminTopbar
                                changeAdminState={this.adminStateHandler}
                                logoutUser={this.props.logoutUser}
                                />
                            : <UserTopbar  
                                changeUserState={this.userStateHandler}
                                logoutUser={this.props.logoutUser}
                                />
                        }
                        <div className="container-fluid">
                            {userType === 'admin' ? this.adminSateRender() : this.userStateRender()}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

LayoutDashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    // vehicle: PropTypes.object.isRequired,
    editVehicleInfo: PropTypes.func.isRequired
    // Authenticated Will be Chacked Here
}

const mapStateToProps = (state) => ({
    auth: state.auth
    // vehicle: state.vehicle
})

const mapActionsToProps = {
    editVehicleInfo
}
 
export default connect(
    mapStateToProps, 
    mapActionsToProps
)(LayoutDashboard);