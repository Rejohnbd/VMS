import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { DeviceTextInputGroup } from '../../utils/';
// import { store } from 'react-notifications-component';
// Redux
import {connect} from 'react-redux';
import { addDevice } from '../../redux/actions/DeviceAction';

class AddDevice extends Component {
    state = {
        imei: '',
        registration_number: '',
        device_sim_number: '',
        device_model: '',
        center_number: '',
        vehicle_type: 0,
        cls_name: false,
        errors: {},
        addNotification: false
    }

    onChangeHandler = (e) => {
        e.preventDefault();
        this.setState({ 
            [e.target.name] : e.target.value,
            errors: {},
            cls_name: false
        })
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.imei === ''){
            this.setState({errors: {imei: 'Device IMEI Number is Required'}});
            return;
        }

        if(this.state.registration_number === ''){
            this.setState({errors: {registration_number: 'Registration Number is Required'}});
            return;
        }

        if(this.state.device_sim_number === ''){
            this.setState({errors: {device_sim_number: 'Device SIM Number is Required'}});
            return;
        } else if((this.state.device_sim_number).length < 11 || (this.state.device_sim_number).length > 11 ){
            this.setState({errors: {device_sim_number: 'Provide Correct Phone Number'}});
            return;
        }

        if(this.state.device_model === ''){
            this.setState({errors: {device_model: 'Device Model is Required'}})
            return;
        }

        if(this.state.center_number === ''){
            this.setState({errors: {center_number: 'Center Number is Required'}});
            return;
        } else if((this.state.center_number).length < 11 || (this.state.center_number).length > 11 ){
            this.setState({errors: {center_number: 'Provide Correct Phone Number'}});
            return;
        }

        if(this.state.vehicle_type === 0){
            this.setState({ 
                cls_name: true
            })
            return;
        }

        const newDevice = {
            imei: this.state.imei,
            registration_number: this.state.registration_number,
            device_sim_number: this.state.device_sim_number,
            device_model: this.state.device_model,
            center_number: this.state.center_number,
            vehicle_type: this.state.vehicle_type
        }

        this.props.addDevice(newDevice);
        this.setState({ addNotification: true })
        this.setState({
            imei: '',
            registration_number: '',
            device_sim_number: '',
            device_model: '',
            center_number: '',
            vehicle_type: 0,
            cls_name: false,
            errors: {},
        })
    }

    render() {
        const { imei, registration_number, device_sim_number, device_model, center_number, vehicle_type, cls_name, errors } = this.state; 
        const vehicleTypeError = cls_name ? ('is-invalid'): null;
        
        // const { popupMessage } = this.props;
        // console.log(popupMessage);
        // let notificationMarkup = this.state.addNotification ? (store.addNotification(
        //     popupMessage
        // )) : null;
        return (
            <Fragment>
                {/* { notificationMarkup } */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    {/* <h1 className="h3 mb-0 text-gray-800">Vehicle Location</h1> */}
                </div>
                <div className="card shadow mb-4" >
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-center text-primary">ADD NEW DEVICE</h6>
                    </div>
                    <div className="card-body" >
                        <form >
                            <DeviceTextInputGroup 
                                id="imei"
                                label="Device IMEI"
                                name="imei"
                                placeholder="Enter Device IMEI Number"
                                onChange={this.onChangeHandler}
                                value={imei}
                                error={errors.imei}
                            />
                            <DeviceTextInputGroup 
                                id="registration_number"
                                label="Registration Number"
                                name="registration_number"
                                placeholder="Enter Registration Numbe"
                                onChange={this.onChangeHandler}
                                value={registration_number}
                                error={errors.registration_number}
                            />
                            <DeviceTextInputGroup 
                                id="device_sim_number"
                                label="Device SIM Number"
                                name="device_sim_number"
                                placeholder="Enter Device Sim Number"
                                onChange={this.onChangeHandler}
                                value={device_sim_number}
                                error={errors.device_sim_number}
                            />
                            <DeviceTextInputGroup 
                                id="device_model"
                                label="Device Model"
                                name="device_model"
                                placeholder="Enter Device Model"
                                onChange={this.onChangeHandler}
                                value={device_model}
                                error={errors.device_model}
                            />
                            <DeviceTextInputGroup 
                                id="center_number"
                                label="Center Number"
                                name="center_number"
                                placeholder="Enter Center Number"
                                onChange={this.onChangeHandler}
                                value={center_number}
                                error={errors.center_number}
                            />
                            <div className="form-group">
                                <label htmlFor="vehicle_type">Vechile Type</label>
                                <select
                                    id="vehicle_type"
                                    className={`form-control ${vehicleTypeError}` }
                                    name="vehicle_type"
                                    value={vehicle_type} 
                                    onChange={this.onChangeHandler}
                                >
                                    <option value="0">Select Your Vechile Type</option>
                                    <option value="1">MOTOR CYCLE</option>
                                    <option value="2">CAR</option>
                                    <option value="3">TRUCK</option>
                                    <option value="4">BUS</option>
                                    <option value="5">OTHERS</option>
                                </select>
                                {cls_name ? (<div className="invalid-feedback">Please Select Vechile Type</div>) : null}
                            </div>
                            <button onClick={this.onSubmitForm}  className="btn btn-primary btn-user btn-block">ADD NEW DEVICE</button>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

AddDevice.propTypes = {
    addDevice: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    popupMessage: state.popupMessage
})
 
export default connect(
    mapStateToProps,
    { addDevice }
)(AddDevice);