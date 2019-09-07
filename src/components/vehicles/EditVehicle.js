import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { EditDeviceTextInputGroup } from '../../utils/';
import driverImage from '../../images/driver-image.png';


// Redux
import { connect } from 'react-redux';
import { updateVehicleInfo } from '../../redux/actions/VehicleAction';




class EditVehicle extends React.Component {
    state = {
        file: null,
        device: {
            registration_number: this.props.vehicle.vehicle.registration_number,
            center_number: this.props.vehicle.vehicle.center_number,
            driver_name: this.props.vehicle.vehicle.driver_name,
            driver_phone: this.props.vehicle.vehicle.driver_phone,
            mileage: this.props.vehicle.vehicle.mileage
        },
        picture: this.props.vehicle.vehicle.driver_photo, 
        errors: {}
    }

    onChangeHandler = (e) => {
        e.preventDefault();
        let name= e.target.name
        let value = e.target.value
        let device = this.state.device
        device[name] = value 
        
        this.setState({ device: device, errors: {} })
    }

    imageUploadHandler = (e) => {
        e.preventDefault();
        let reader = new FileReader()
        let file = e.target.files[0];        
        reader.onloadend = () => {
            this.setState({
                file: file,
                picture: reader.result
            })
            // console.log('Image Check',this.state.file)
        }
        // console.log('File info',reader)
        reader.readAsDataURL(file)
        // console.log('show file',this.state.file)
    }

    updateDeviceInfo = () => {
        // console.log(this.props.vehicle.vehicle.id, 'Id');
        let fd = new FormData();
        fd.append('image', this.state.file);
        if(this.state.device.registration_number === '' || typeof (this.state.device.registration_number) === 'undefined'){
            this.setState({errors: {registration_number: 'Registration Number is Required'}})
            return;
        }
        fd.append('registration_number', this.state.device.registration_number);

        if(this.state.device.center_number === '' || typeof (this.state.device.center_number) === 'undefined'){
            this.setState({errors: {center_number: 'Center Number is Required'}})
            return;
        } else {
            if( (this.state.device.center_number).length < 11 || (this.state.device.center_number).length > 11){
                this.setState({errors: {center_number: 'Provide Right Center Number'}})
                return;
            }
        }         
        fd.append('center_number', this.state.device.center_number);

        if(this.state.device.driver_name === '' || typeof (this.state.device.driver_name) === 'undefined'){
            this.setState({errors: {driver_name: 'Driver Name is Required'}})
            return;
        }
        fd.append('driver_name', this.state.device.driver_name);

        if(this.state.device.driver_phone === '' || typeof (this.state.device.driver_phone) === 'undefined' ){
            console.log('Called 1')
            this.setState({errors: {driver_phone: 'Driver Phone is Required'}})
            return;
        } else {
            if( (this.state.device.driver_phone).length < 11 || (this.state.device.driver_phone).length > 11){
                this.setState({errors: {driver_phone: 'Provide Right Driver Phone Number'}})
                return;
            }
        }
        
        fd.append('driver_phone', this.state.device.driver_phone);

        if(this.state.device.mileage === '' || typeof (this.state.device.mileage) === 'undefined'){
            this.setState({errors: {mileage: 'Milage is Required'}})
            return;
        } else {
            if((this.state.device.mileage).length > 3 ){
                this.setState({errors: {mileage: 'Provide Correct Milage'}})
                return;
            }
        }
        fd.append('mileage', this.state.device.mileage);
        this.props.updateVehicleInfo(this.props.vehicle.vehicle.id, fd);
        this.props.changeUserState('VEHICLES_LIST');
    }

    render() { 
   
        return (
            <Fragment>
               
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    {/* <h1 className="h3 mb-0 text-gray-800">Edit Device</h1> */}
                </div>

                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-center text-primary">EDIT VEHICLE INFORMATIONS</h6>
                    </div>
                    <div className="card-body">
                    
                        <EditDeviceTextInputGroup
                            id="registrationNumber"
                            label="Registration Number"
                            type="text"
                            name="registration_number"
                            placeholder="Update Registration Number"
                            value={this.state.device.registration_number}
                            onChange={this.onChangeHandler}
                            error={this.state.errors.registration_number} 
                        />

                        <EditDeviceTextInputGroup
                            id="centerNumber"
                            label="Center Number"
                            type="number"
                            name="center_number"
                            placeholder="Update Center Number"
                            value={this.state.device.center_number}
                            onChange={this.onChangeHandler}
                            error={this.state.errors.center_number} 
                        />

                        <EditDeviceTextInputGroup
                            id="driverName"
                            label="Driver Name"
                            type="text"
                            name="driver_name"
                            placeholder="Update Driver Name"
                            value={this.state.device.driver_name}
                            onChange={this.onChangeHandler}
                            error={this.state.errors.driver_name} 
                        />

                        <EditDeviceTextInputGroup
                            id="driverPhone"
                            label="Driver Phone"
                            type="text"
                            name="driver_phone"
                            placeholder="Update Driver Phone"
                            value={this.state.device.driver_phone}
                            onChange={this.onChangeHandler}
                            error={this.state.errors.driver_phone}
                        />

                        <EditDeviceTextInputGroup
                            id="mileage"
                            label="Vehicle Milage"
                            type="number"
                            name="mileage"
                            placeholder="Update Vehicle Milage"
                            value={this.state.device.mileage}
                            onChange={this.onChangeHandler}
                            error={this.state.errors.mileage}
                        />

                        <div className="form-group row">
                            <label htmlFor="driverImage" className="col-sm-2 col-form-label">Driver Image</label>
                            <div className="row">
                                <div className="col-sm-6">
                                    <input type="file"  accept='image/jpeg, image/png' onChange={this.imageUploadHandler} className="form-control-file" id="driverImage"/>
                                </div>
                                <div className="col-sm-6">
                                    { this.state.picture ? 
                                        (<img className="img-fluid img-profile img-thumbnail driver-image" src={this.state.picture} alt="Update Driver" />):
                                        (<img className="img-fluid img-profile img-thumbnail driver-image" src={driverImage} alt="Update Driver" />)
                                    }
                                </div>
                            </div>
                        </div>
                        <button type="button" onClick={this.updateDeviceInfo} className="btn btn-success btn-block">UPDATE VEHICLE INFORMATIONS</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

EditVehicle.propTypes = {
    vehicle: PropTypes.object.isRequired,
    updateVehicleInfo: PropTypes.func.isRequired
}


const mapStateToProps = (state) =>({
    vehicle: state.vehicle
})
 
export default connect(
    mapStateToProps,
    {updateVehicleInfo}
)(EditVehicle);