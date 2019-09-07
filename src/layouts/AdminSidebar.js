import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTruck, 
    faTachometerAlt,
    faList,
    faTable,
    faUser,
    faPowerOff,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
// import { faBell } from '@fortawesome/fontawesome-svg-core';
// Redux 
import { connect } from "react-redux";

class AdminSidebar extends React.Component {
    state = {  }

    selectDashboar = () => {
        this.props.changeAdminState('ADMIN_DASHBOARD');
    }

    selectDeviceList = () => {
        this.props.changeAdminState('DEVICES_LIST');
    }

    selectAdminProfile = () => {
        this.props.changeAdminState('ADMIN_PROFILE')
    }

    logoutHandler = () => {
        this.props.logoutUser();
    }

    render() { 
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <button onClick={this.selectDashboar}  className="brand-home-icon sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <FontAwesomeIcon icon={faTruck} />
                    </div>
                    <div className="sidebar-brand-text mx-3">VMS</div>
                </button>
                <hr className="sidebar-divider my-0" />
                <li className="nav-item active">
                    <button onClick={this.selectDashboar} className="nav-link">
                        <FontAwesomeIcon icon={faTachometerAlt} />
                        <span> Dashboard</span>
                    </button>
                </li>
                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Device Info.
                </div>
                <li className="nav-item">
                    <button onClick={this.selectDeviceList} className="nav-link">
                        <FontAwesomeIcon icon={faList} />
                        <span> All Device List</span>
                    </button>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/l">
                        <FontAwesomeIcon icon={faTable} />
                        <span> Assigned Device List</span>
                    </a>
                </li>
                <div className="sidebar-heading">
                    Users Info.
                </div>
                <li className="nav-item">
                    <button onClick={this.selectDeviceList} className="nav-link">
                        <FontAwesomeIcon icon={faList} />
                        <span> All Users List</span>
                    </button>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/l">
                        <FontAwesomeIcon icon={faTable} />
                        <span> Assigned Device List</span>
                    </a>
                </li>
                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Profile Info.
                </div>
                <li className="nav-item">
                    <button onClick={this.selectAdminProfile} className="nav-link">
                        <FontAwesomeIcon icon={faUser} />
                        <span> Admin Profile</span>
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
const mapStateToProps = (state) => ({

})
 
export default connect(
    mapStateToProps,
    null
)(AdminSidebar);