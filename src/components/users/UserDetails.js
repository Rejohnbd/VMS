import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import UserSingleDevice from './UserSingleDevice';
import { UnassignDeviceModal } from '../devices';
import { VehicleLocationModal } from '../location';
import * as geolib from 'geolib';
import { convertData } from '../../utils/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPhoneSquareAlt,
    faAddressBook,
    faUniversity,
    faEnvelope,
    faHdd
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import '../../../node_modules/sweetalert2/dist/sweetalert2.css';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import profileImage from '../../images/profile-image.png';
// Redux
import { connect } from 'react-redux';
// import { getUserDevice} from '../../redux/actions/UserAction';
import { assignedDeviceToUser, unAssignUserDevice } from '../../redux/actions/DeviceAction';

let ref = null;

class UserDetails extends React.Component {
    state = {
        modalIsOpen: false,
        showModal: false,
        device: null,
        deviceData: {},
        data: null,
        rotation: 0
    }

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }
    
    modalClose = () => {
        this.setState({ modalIsOpen: false })
    }

    closeMapModal = () => {
        this.setState({ showModal: false })
        ref.off();
    }

    assignDeviceHandler = (imei) => {
        let data = {
            uid: this.props.user._id,
            imei: imei
        }
        this.props.assignedDeviceToUser(data);
        Swal.fire({
            type: 'success',
            title: 'Device Assign Successfully',
            showConfirmButton: false,
            timer: 1500
        })
        this.setState({ modalIsOpen: false })
    }

    deleteDevice = (device) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to remove this device from this User?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
                this.props.unAssignUserDevice(device);
                Swal.fire(
                    'Removed!',
                    'Device Removed Successfully',
                    'success'
                )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'Nothing Changed',
                'error'
              )
            }
          })
    }

    changeState = (currntData,rotation) => {
        this.setState({data: currntData,rotation:rotation})
      }
    
      animate = (data, newData, currentState) => {
        
        let step = 30;
        let deltaLat = (newData.lat - data.lat)/step;
        let deltaLng = (newData.lng - data.lng)/step;
        let cdata = data;
    
        let rotation = geolib.getGreatCircleBearing(
          {latitude: data.lat, longitude: data.lng},
          {latitude: newData.lat, longitude: newData.lng}
        )
        
        function anim (){
          let newLat = cdata.lat + deltaLat;
          let newLng = cdata.lng + deltaLng;
          
          cdata.lat = newLat;
          cdata.lng = newLng;
         
          if(step > 0){
            requestAnimationFrame(anim)
            step --;
          }
        
          currentState(cdata,rotation)
        }
        requestAnimationFrame(anim)
      }

    deviceViewInMap = (device) => {
        ref = firebase.database().ref().child('devices').child(device.imei)
        ref.on('child_added', data => {
            if(data.key ==='data'){
                this.setState({ 
                    deviceData: convertData(data.val()),
                    data: convertData(data.val())
                })
                this.setState({ showModal: true })
            }
         })

         ref.on('child_changed', data => {
            if(data.key ==='data'){
              let newData = convertData(data.val())
              this.animate(this.state.data, newData,this.changeState)
            }           
          })
    }

    render() { 
        const { name, image, email, contact, address, organization_name } = this.props.user;
        const { devices } = this.props;
        let userUsedDevices = devices.filter(device => device.uid === this.props.user._id);
        let deviceMarkup = (userUsedDevices === undefined) ? (
             <Loader style={{margin: '0px auto', marginBottom: '30px'}} type="Circles" color="#4e73df" height={50} width={100} />
        ) : (
            (userUsedDevices.length === 0) ?(
                <div className="alert alert-danger ml-2 mr-2" role="alert">
                    No Device Found For this User
                </div>
            ) :(
                userUsedDevices.map(device =>(
                    <UserSingleDevice deviceViewInMap={this.deviceViewInMap} deleteDevice={this.deleteDevice} device={device} key={device._id} />
                ))
            ) 
        )
        
        return (
            <Fragment>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">&nbsp;</h1>
                    <button  className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={this.openModal}>
                        <FontAwesomeIcon icon={faHdd} /> Assing New Device
                    </button>
                </div>
                <div className="row">
                    <div className="col-md-12 col-lg-4">
                        <div className="card shadow text-center">
                            <div className="card-header text-capitalize">
                                <h5 className="text-primary">{name}</h5>
                            </div>
                                { (image) ? (
                                    <img src={image} className="img-thumbnail img-fluid card-img-top mx-auto" style={{ width: '200px' }} alt="User Profile Picture" />
                                ) : (
                                    <img src={profileImage} className="img-thumbnail img-fluid card-img-top mx-auto" style={{ width: '200px' }} alt="User Profile Picture" />
                                ) }
                                <ul className="list-group list-group-flush text-left">
                                    <li className="list-group-item">
                                        <FontAwesomeIcon icon={faEnvelope} className="text-primary" /> {email}
                                    </li>
                                    <li className="list-group-item">
                                        <FontAwesomeIcon icon={faPhoneSquareAlt} className="text-primary" /> {contact}
                                    </li>
                                    <li className="list-group-item">
                                        <FontAwesomeIcon icon={faAddressBook} className="text-primary" /> {address}
                                    </li>
                                    <li className="list-group-item">
                                        <FontAwesomeIcon icon={faUniversity} className="text-primary" /> {organization_name}
                                    </li>
                                </ul>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-8">
                        <div className="card shadow mb-4" >
                            <div className="card-header py-3 mb-4">
                                <h6 className="m-0 font-weight-bold text-center text-primary">
                                    USES DEVICE <span className="badge badge-success badge-pill"></span>
                                </h6>
                            </div>
                           {deviceMarkup}
                        </div>
                    </div>
                </div>
                <UnassignDeviceModal modalIsOpen={this.state.modalIsOpen} modalClose={this.modalClose} assignDevice={this.assignDeviceHandler} />
                <VehicleLocationModal device={this.state.deviceData} showModal={this.state.showModal} modalClose={this.closeMapModal} rotation ={this.state.rotation} data={this.state.data} />
            </Fragment>
        );
    }
}

UserDetails.propTypes = {
    assignedDeviceToUser: PropTypes.func.isRequired,
    unAssignUserDevice: PropTypes.func.isRequired,
    devices: PropTypes.array.isRequired,
    // getUserDevice: PropTypes.func.isRequired,
    // unAssignUserDevice: PropTypes.func.isRequired,
    // getUnassignDevices: PropTypes.func.isRequired,
    // unassignDevices: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    devices: state.device.devices,
})

const mapActionToProps = {
    assignedDeviceToUser,
    unAssignUserDevice
    // getUserDevice,
    // unAssignUserDevice,
    // getUnassignDevices,
    
}
 
export default connect(
    mapStateToProps,
    mapActionToProps
)(UserDetails);