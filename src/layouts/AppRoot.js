import React from 'react';
import { LayoutLogin, LayoutDashboard } from './index';
import PropTypes from 'prop-types';
// import jwtDecode from 'jwt-decode';
// Redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/AuthAction';


class AppRoot extends React.Component {
    state = {
        authenticated: false
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.authenticated){
            this.setState({ authenticated: nextProps.auth.authenticated })
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
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
 
export default connect(
    mapStateToProps,
    {logoutUser}
)(AppRoot);