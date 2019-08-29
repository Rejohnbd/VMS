import React from 'react';
import { LayoutLogin, LayoutDashboard } from './index';
import PropTypes from 'prop-types';
// import jwtDecode from 'jwt-decode';
// Redux
import { connect } from 'react-redux';



class AppRoot extends React.Component {
    state = {
        authenticated: false
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.authenticated){
            this.setState({ authenticated: nextProps.user.authenticated })
        }
    }

    render() {
            const authenticated = this.state.authenticated;
        return (
             authenticated ? <LayoutDashboard /> : <LayoutLogin />
        );
    }
}

AppRoot.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})
 
export default connect(
    mapStateToProps,
    null
)(AppRoot);