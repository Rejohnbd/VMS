import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Datatable } from "@o2xp/react-datatable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip  from 'react-tooltip';
import { 
    faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { store } from 'react-notifications-component';
// Redux
import { connect } from 'react-redux';


class UnassignDeviceModal extends Component {
    state = {
        devices:[],
        device: null,
    }

    assignDevice = (device) => {
        if(device.length > 1 ){
            store.addNotification({
                title: "You Select Multiple Device!",
                message: "Please select only one device to assign",
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
            this.props.assignDevice(deviceObj.imei)
        }
        
    }

    render() {
        const { devices } = this.props;
        let unassignedDevices = devices.filter(device => device.uid === null); 
        let options  = {
            dimensions: {
                datatable: {
                    height: '500',
                    width: '97%'
                },
                row: {
                    height: "60px"
                }
            },
            keyColumn: 'imei',
            data: {
                columns: [ 
                    { id: "imei", label: "DEVICE IMEI" },
                    { id: "registration_number", label: "REGISTRATION NUMBER" },
                    { id: "device_model", label: "DEVICE MODEL" },
                    { id: "device_sim_number", label: "DEVICE SIM NUMBER" },
                    { id: "center_number", label: "CENTER NUMBER" },
                ],
                rows: unassignedDevices
            },
            features: {
                selectionIcons: [
                    {
                        title: 'Assign Device',
                        icon: <FontAwesomeIcon icon={faCheck} style={{color: '#3f51b5'}} />,
                        onClick: (device) => this.assignDevice(device)
                    },
                ],
                canPrint: false,
                canDownload: false,
                canSearch: true,
                canOrderColumns: true,
                canSelectRow: true,
                userConfiguration: {
                    columnsOrder: ["imei", "registration_number", "device_model", "device_sim_number", "center_number"]
                },
            }
        }
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                className="Modal"
                overlayClassName="Overlay"
                ariaHideApp={false}
                contentLabel="Example Modal" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">List of Unassign Devices</h5>
                            <button onClick={this.props.modalClose} type="button" className="close" data-dismiss="modal" data-tip="Close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <ReactTooltip />
                        </div>
                        <div className="modal-body">
                            <Datatable 
                                options={options}
                            /> 
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.props.modalClose} type="button" className="btn btn-block btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
            </Modal>
        );
    }
}

UnassignDeviceModal.propTypes = {
    devices: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    devices: state.device.devices
})
 
export default connect(
    mapStateToProps
)(UnassignDeviceModal);