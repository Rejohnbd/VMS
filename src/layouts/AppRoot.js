import React from 'react';
import { LayoutLogin, LayoutDashboard } from './index';
import PropTypes from 'prop-types';
// import jwtDecode from 'jwt-decode';
// Redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/UserAction';


class AppRoot extends React.Component {
    state = {
        authenticated: false
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.authenticated){
            this.setState({ authenticated: nextProps.user.authenticated })
        }
    }

    logoutHandler = () => {
        this.props.logoutUser();
        this.setState({ authenticated: false })
    }

    render() {
            const authenticated = this.state.authenticated;
        return (
             authenticated ? <LayoutDashboard logoutUser={this.logoutHandler} /> : <LayoutLogin />
        );
    }
}

AppRoot.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})
 
export default connect(
    mapStateToProps,
    {logoutUser}
)(AppRoot);