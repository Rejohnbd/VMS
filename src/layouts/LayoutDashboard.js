import React from 'react';
import PropTypes from 'prop-types';
import { Topbar, AdminSidebar, UserSidebar, Footer } from './index'
import { AdminDashboard, UserDashboard } from '../components/dashboard';
import { DeviceList } from '../components/devices';
import { VehicleList } from '../components/vehicles';
import { VehicleLocation } from '../components/location';

// Redux
import { connect } from 'react-redux';


class LayoutDashboard extends React.Component {
    state = {
        device: null,
        adminState: '',
        userState: ''
    }

    adminStateHandler = (stateStatus) => {
        this.setState({ adminState: stateStatus })
    }

    adminSateRender = () => {
        switch(this.state.adminState){
            case 'ADMIN_DASHBOARD':
                return <AdminDashboard />
            case 'DEVICES_LIST':
                return <DeviceList />
            default:
                return <AdminDashboard />
        }
    }


    userStateHandler = (stateStatus) => {
        this.setState({ userState: stateStatus })
    }

    vechicleLocationHandler = (devices) => {
        this.setState({ device: devices, userState: 'VEHICLE_LOCATION' })
    }

    userStateRender = () => {
        switch(this.state.userState){
            case 'USER_DASHBOARD':
                return <UserDashboard />
            case 'VEHICLES_LIST':
                return <VehicleList
                    goToVehicleLocation={this.vechicleLocationHandler}
                    />
            case 'VEHICLE_LOCATION':
                return <VehicleLocation device={this.state.device} />
            default: 
                return <UserDashboard />
        }
    }

    render() {
        const {  userInfo: { userType } } = this.props.user; 
        return (
            <div id='wrapper'>
                 {userType === 'admin' ? <AdminSidebar changeAdminState={this.adminStateHandler} />: <UserSidebar changeUserState={this.userStateHandler}/>}
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
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
    user: PropTypes.object.isRequired,
    // Authenticated Will be Chacked Here
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {

}
 
export default connect(
    mapStateToProps, 
    mapActionsToProps
)(LayoutDashboard);