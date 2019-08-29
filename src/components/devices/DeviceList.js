import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from "react-redux";

class DeviceList extends React.Component {
    state = {  }
    render() { 
        return (
            <Fragment>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Device List</h1>
                </div>
            </Fragment>
        );
    }
}

DeviceList.propTypes = {

}

const mapStateToProps = (state) => {

}
 
export default connect(
    mapStateToProps,
    null
)(DeviceList);