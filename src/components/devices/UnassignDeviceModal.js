import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      background            : 'rgb(78,115,223)'
    }
};

class UnassignDeviceModal extends Component {
    state = {
        devices:[],
        device: null,
    }
    
    itemClick = (device) => {
         this.props.closeModal(device)
    }

    assignDevice = (imei) => {
        console.log(imei, 'From Modal')
        this.props.assignDevice(imei)
    }

    render() { 
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">List of Unassign Devices</h5>
                            <button onClick={this.props.modalClose} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Device IMEI</th>
                                        <th scope="col">Device SIM Number</th>
                                        <th scope="col">Registation Number</th>
                                        <th scope="col">Device Model</th>
                                        <th scope="col">Center Number</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.devices.map(device =>(
                                        <tr key={device._id}>
                                            <td>{device.imei}</td>
                                            <td>{device.device_sim_number}</td>
                                            <td>{device.registration_number}</td>
                                            <td>{device.device_model}</td>
                                            <td>{device.center_number}</td>
                                            <td><button onClick={this.assignDevice.bind(this, device.imei)} className="btn btn-success btn-sm">Assign</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.props.modalClose} type="button" className="btn btn-block btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
            </Modal>
        );
    }
}
 
export default UnassignDeviceModal;