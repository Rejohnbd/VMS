import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Datatable } from "@o2xp/react-datatable";
// import MaterialTable from 'material-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEye,
} from '@fortawesome/free-solid-svg-icons';
// Redux
import { connect } from 'react-redux';
import { getDevices } from '../../redux/actions/DeviceAction';



class DeviceList extends React.Component {
    state = {  }

    componentDidMount() {
        this.props.getDevices();
    }

    render() {
        const { devices } = this.props;
        console.log(devices)
        let options  = {
            dimensions: {
                datatable: {
                    height: '500',
                    width: '100%'
                },
                row: {
                    height: "60px"
                }
            },
            keyColumn: 'imei',
            data: {
                columns: [ 
                    { id: "imei", label: "DEVICE IMEI" },
                    { id: "device_model", label: "DEVICE MODEL" },
                    { id: "device_sim_number", label: "DEVICE SIM NUMBER" },
                    { id: "registration_number", label: "REGISTRATION NUMBER" },
                    { id: "is_inactive", label: "DEVICE STATUS" },
                    { id: "vehicle_type", label: "VEHICLE TYPE"}
                ],
                rows: devices
            },
            features: {
                selectionIcons: [
                    {
                        title: 'View User',
                        icon: <FontAwesomeIcon icon={faEye} style={{color: '#3f51b5'}} />,
                        onClick: (user) => this.goToUserDetail(user)
                    },
                ],
                // canEdit: true,
                // canDelete: true,
                canPrint: true,
                canDownload: true,
                canSearch: true,
                // canRefreshRows: true,
                canOrderColumns: true,
                canSelectRow: true,
                canSaveUserConfiguration: true,
                userConfiguration: {
                    columnsOrder: ["imei", "device_model", "device_sim_number", "registration_number", "is_inactive", "vehicle_type"]
                },
                // additionalIcons: [ 
                //     {
                //         title: 'View User',
                //         icon: <FontAwesomeIcon icon={faFolderPlus} />,
                //         onClick: ()=>{console.log('got')} 
                //     }
                // ],
                 
                // selectionIcons: [
                //     {
                //       title: "Selected Rows",
                //       icon: <DataUsage />,
                //       onClick: rows => console.log(rows)
                //     }
                // ]
            }
        }
        return (
            <Fragment>
                <div className="card shadow mb-4" >
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-center text-primary">ALL DEVICES LIST</h6>
                    </div>
                    <Datatable 
                        options={options}
                    />
                </div>
            </Fragment>
        );
    }
}

DeviceList.propTypes = {
    getDevices: PropTypes.func.isRequired,
    devices: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    devices: state.device.devices
})
 
export default connect(
    mapStateToProps,
    {getDevices}
)(DeviceList);