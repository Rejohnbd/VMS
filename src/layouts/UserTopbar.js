import React from 'react';
import userImage from '../images/user-image.png';
import PropTypes from 'prop-types';
import ReactTooltip  from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBell, 
    faEnvelope,
    faBars,
    faSearch,
    faFileAlt,
    faUser,
    faCogs,
    faList,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
// import { faBell } from '@fortawesome/fontawesome-svg-core';
// Redux
import { connect } from 'react-redux';



class UserTopbar extends React.Component {

    selectUserProfile = () => {
        this.props.changeUserState('USER_PROFILE')
    }

    logoutHandler = () => {
        this.props.logoutUser()
    }

    render() {
      
        const { 
            authenticated,
            userInfo: {
                _id,
                name,
                email,
                contact,
                image
            }
         } = this.props.user;
        
        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                        <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    </div>
                </form>
                
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown no-arrow mx-1" data-tip="Show Notification">
                        <a className="nav-link dropdown-toggle" href="/" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FontAwesomeIcon icon={faBell} />
                            <span className="badge badge-danger badge-counter">3+</span>
                        </a>
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                            <h6 className="dropdown-header">
                            Alerts Center
                            </h6>
                            <a className="dropdown-item d-flex align-items-center" href="/">
                            <div className="mr-3">
                                <div className="icon-circle bg-primary">
                                <FontAwesomeIcon className="text-white" icon={faFileAlt} />
                                </div>
                            </div>
                            <div>
                                <div className="small text-gray-500">December 12, 2019</div>
                                <span className="font-weight-bold">A new monthly report is ready to download!</span>
                            </div>
                            </a>
                            <a className="dropdown-item text-center small text-gray-500" href="/">Show All Alerts</a>
                        </div>
                    </li>
                    <ReactTooltip />

                    <li className="nav-item dropdown no-arrow mx-1" data-tip="Show Message">
                        <a className="nav-link dropdown-toggle" href="/" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span className="badge badge-danger badge-counter">7</span>
                        </a>
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                            <h6 className="dropdown-header">
                            Message Center
                            </h6>
                            <a className="dropdown-item d-flex align-items-center" href="/">
                            <div className="dropdown-list-image mr-3">
                                <img className="rounded-circle" src={userImage} alt="" />
                                <div className="status-indicator bg-success"></div>
                            </div>
                            <div className="font-weight-bold">
                                <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                                <div className="small text-gray-500">Emily Fowler · 58m</div>
                            </div>
                            </a>
                            <a className="dropdown-item text-center small text-gray-500" href="/">Read More Messages</a>
                        </div>
                    </li>

                    <div className="topbar-divider d-none d-sm-block"></div>

                    <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                            {name ? name : email}
                        </span>
                        {image ? (
                            <img className="img-profile rounded-circle" src={image} alt="User Profile" />
                        ) : (
                            <img className="img-profile rounded-circle" src={userImage} alt="User Profile" />
                        )}
                        
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        <button className="dropdown-item" onClick={this.selectUserProfile}>
                            <FontAwesomeIcon className="mr-2 text-gray-400" icon={faUser} />
                            Profile
                        </button>
                        <a className="dropdown-item" href="/">
                        <FontAwesomeIcon className="mr-2 text-gray-400" icon={faCogs} />
                        Settings
                        </a>
                        <a className="dropdown-item" href="/">
                        <FontAwesomeIcon className="mr-2 text-gray-400" icon={faList} />
                        Activity Log
                        </a>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" onClick={this.logoutHandler} >
                            <FontAwesomeIcon className="mr-2 text-gray-400" icon={faSignOutAlt} />
                            Logout
                        </button>
                    </div>
                    </li>

                </ul>
            </nav>
        );
    }
}

UserTopbar.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})
 
export default connect(
    mapStateToProps
)(UserTopbar);