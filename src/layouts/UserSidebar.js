import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTruck,
    faCarSide, 
    faTachometerAlt,
    faUser,
    faTable,
    faPowerOff,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
// import { faBell } from '@fortawesome/fontawesome-svg-core';
// Redux
import { connect } from "react-redux";

class UserSidebar extends React.Component {
    state = {  }

    selectDashboard = () => {
        this.props.changeUserState('USER_DASHBOARD');
    }

    selectVehicleList = () => {
        // this.props.getVehicleList(this.props.user.userInfo.email)
        this.props.changeUserState('VEHICLES_LIST');
    }

    selectUserProfile = () => {
        this.props.changeUserState('USER_PROFILE')
    }

    logoutHandler = () => {
        this.props.logoutUser();
    }

    render() { 
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <button onClick={this.selectDashboard}  className="brand-home-icon sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <FontAwesomeIcon icon={faTruck} />
                    </div>
                    <div className="sidebar-brand-text mx-3">VMS</div>
                </button>
                <hr className="sidebar-divider my-0" />
                <li className="nav-item active">
                    <button onClick={this.selectDashboard} className="nav-link">
                        <FontAwesomeIcon icon={faTachometerAlt} />
                        <span> Dashboard</span>
                    </button>
                </li>
                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Vehicle Info.
                </div>
                <li className="nav-item">
                    <button onClick={this.selectVehicleList} className="nav-link">
                        <FontAwesomeIcon icon={faCarSide} />
                        <span> All Vehicle List</span>
                    </button>
                </li>
                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Profile Info.
                </div>
                <li className="nav-item">
                    <button onClick={this.selectUserProfile} className="nav-link">
                        <FontAwesomeIcon icon={faUser} />
                        <span> User Profile</span>
                    </button>
                </li>
                <hr className="sidebar-divider" />
                <li className="nav-item">
                    <button onClick={this.logoutHandler} className="nav-link">
                        <FontAwesomeIcon icon={faPowerOff} />
                        <span> Logout</span>
                    </button>
                </li>
                <hr className="sidebar-divider d-none d-md-block" />
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </ul>
        );
    }
}

UserSidebar.propTypes = {
    user: PropTypes.object.isRequired,
    // vehicle: PropTypes.object.isRequired,
    // getVehicleList: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    // vehicle: state.vehicle
})
 
export default connect(
    mapStateToProps,
)(UserSidebar);