import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { setDefaultMessage } from '../../redux/actions/MessageAction';



class Message extends React.Component {
    
    closeHandler = () => {
        this.props.setDefaultMessage()
    }

    render() {
        const {textDetails, className} = this.props.message 
        return (
            <div className={`alert ${className} alert-dismissible fade show`} role="alert">
                <strong>{textDetails}</strong>
                <button type="button" onClick={this.closeHandler} className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}

Message.propTypes = {
    message: PropTypes.object.isRequired,
    setDefaultMessage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    message: state.message
})
 
export default connect(
    mapStateToProps,
    { setDefaultMessage }
)(Message);