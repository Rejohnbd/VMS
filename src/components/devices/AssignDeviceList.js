import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Datatable } from "@o2xp/react-datatable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEye,
} from '@fortawesome/free-solid-svg-icons';
import { store } from 'react-notifications-component';
// Redux
import { connect } from 'react-redux';
// import { getDevices } from '../../redux/actions/DeviceAction';



class AssignDeviceList extends React.Component {
    state = {  }

    componentDidMount() {
        // this.props.getDevices();
    }

    goToDeviceDetail = (device) => {
        if(device.length > 1 ){
            store.addNotification({
                title: "You Select Multiple Devices!",
                message: "Please select only one Device to show details",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            })
        }
        if(device.length === 1) {
            let deviceObj =  {};
            device.map(device=> {
                deviceObj = device
            })
            this.props.goToDeviceDetails(deviceObj);
        }
    }

    render() {
        // let allDevice = [];
        // const { devices } = this.props;
        // devices.map(device => {
        //     let vehicleType;
        //     switch(device.vehicle_type) {
        //         case 1: 
        //             vehicleType = "MOTOR CYCLE";
        //             break;
        //         case 2: 
        //             vehicleType = "CAR";
        //             break;
        //         case 3: 
        //             vehicleType = "TRUCK";
        //             break;
        //         case 4: 
        //             vehicleType = "BUS";
        //             break;
        //         case 5: 
        //             vehicleType = "OTHERS";
        //             break;
        //         default:
        //             vehicleType = "";
        //             break;
        //     }
        //     let formatDevice = {
        //         _id: device._id,
        //         uid: device.uid,
        //         imei: device.imei,
        //         registration_number: device.registration_number,
        //         center_number: device.center_number,
        //         is_inactive: device.uid ? 'Assigned' : 'Unassigned',
        //         device_model: device.device_model,
        //         device_sim_number: device.device_sim_number,
        //         driver_name: device.driver_name,
        //         driver_photo: device.driver_photo,                
        //         vehicle_type: vehicleType,
        //         mileage: device.mileage
        //     }
        //     allDevice.push(formatDevice)
        // })
        // let options  = {
        //     dimensions: {
        //         datatable: {
        //             height: '500',
        //             width: '100%'
        //         },
        //         row: {
        //             height: "60px"
        //         }
        //     },
        //     keyColumn: 'imei',
        //     data: {
        //         columns: [ 
        //             { id: "imei", label: "DEVICE IMEI" },
        //             { id: "device_model", label: "DEVICE MODEL" },
        //             { id: "device_sim_number", label: "DEVICE SIM NUMBER" },
        //             { id: "registration_number", label: "REGISTRATION NUMBER" },
        //             { id: "is_inactive", label: "DEVICE STATUS" },
        //             { id: "vehicle_type", label: "VEHICLE TYPE"}
        //         ],
        //         rows: allDevice
        //     },
        //     features: {
        //         selectionIcons: [
        //             {
        //                 title: 'View Device Info',
        //                 icon: <FontAwesomeIcon icon={faEye} style={{color: '#3f51b5'}} />,
        //                 onClick: (device) => this.goToDeviceDetail(device)
        //             },
        //         ],
        //         canPrint: true,
        //         canDownload: true,
        //         canSearch: true,
        //         canOrderColumns: true,
        //         canSelectRow: true,
        //         canSaveUserConfiguration: true,
        //         userConfiguration: {
        //             columnsOrder: ["imei", "device_model", "device_sim_number", "registration_number", "is_inactive", "vehicle_type"]
        //         }
        //     }
        // }
        return (
            <Fragment>
                <div className="card shadow mb-4" >
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-center text-primary">ALL ASSIGN DEVICES LIST</h6>
                    </div>
                    {/* <Datatable 
                        options={options}
                        CustomTableBodyCell={this.deviceStatus}
                    /> */}
                </div>
            </Fragment>
        );
    }
}

AssignDeviceList.propTypes = {
    // getDevices: PropTypes.func.isRequired,
    // devices: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    // devices: state.device.devices
})
 
export default connect(
    mapStateToProps,
    // {getDevices}
)(AssignDeviceList);