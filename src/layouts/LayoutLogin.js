import React from 'react';
import PropTypes from 'prop-types';
import { UserLogin, UserRegistration, Message } from '../components/login';

// Redux
import { connect } from 'react-redux';

class LayoutLogin extends React.Component {
    state = {
        changePageStatus: true
    }

    changePage = () => {
        this.setState({ changePageStatus: !this.state.changePageStatus})
    }

    render() { 
        const { changePageStatus } = this.state;
        const { message } = this.props.message;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            {message ? (<Message />) : null}
                            <div className="card-body p-0">
                                <div className="row login-row-height">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    { changePageStatus ? (
                                        <UserLogin changePage={this.changePage} />
                                    ) : (
                                        <UserRegistration changePage={this.changePage} />
                                    ) }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LayoutLogin.propTypes = {
    auth: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    message: state.message
})
 
export default connect(
    mapStateToProps
)(LayoutLogin);