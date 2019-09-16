import React from 'react';
// import DataTable from 'react-data-table-component';
// import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faDownload
} from '@fortawesome/free-solid-svg-icons';

// const data = [
//     { hour: '1st', time: '12:01AM 01:00AM', distance: '0.00 KM' },
//     { hour: '2nd', time: '01:01AM 02:00AM', distance: '0.00 KM' },
//     { hour: '3rd', time: '02:01AM 03:00AM', distance: '0.00 KM' },
//     { hour: '4th', time: '03:01AM 04:00AM', distance: '0.00 KM' },
//     { hour: '5th', time: '04:01AM 05:00AM', distance: '0.00 KM' },
//     { hour: '6th', time: '05:01AM 06:00AM', distance: '0.00 KM' },
//     { hour: '7th', time: '06:01AM 07:00AM', distance: '0.00 KM' },
//     { hour: '8th', time: '07:01AM 08:00AM', distance: '0.00 KM' },
//     { hour: '9th', time: '08:01AM 09:00AM', distance: '0.00 KM' },
//     { hour: '10th', time: '09:01AM 10:00AM', distance: '0.00 KM' },
//     { hour: '11th', time: '10:01AM 11:00AM', distance: '0.00 KM' },
//     { hour: '12th', time: '11:01AM 12:00PM', distance: '0.00 KM' },
//     { hour: '13th', time: '12:01PM 01:00PM', distance: '0.00 KM' },
//     { hour: '14th', time: '01:01PM 02:00PM', distance: '0.00 KM' },
//     { hour: '15th', time: '02:01PM 03:00PM', distance: '0.00 KM' },
//     { hour: '16th', time: '03:01PM 04:00PM', distance: '0.00 KM' },
//     { hour: '17th', time: '04:01PM 05:00PM', distance: '0.00 KM' },
//     { hour: '18th', time: '05:01PM 06:00PM', distance: '0.00 KM' },
//     { hour: '19th', time: '06:01PM 07:00PM', distance: '0.00 KM' },
//     { hour: '20th', time: '07:01PM 08:00PM', distance: '0.00 KM' },
//     { hour: '21th', time: '08:01PM 09:00PM', distance: '0.00 KM' },
//     { hour: '22th', time: '09:01PM 10:00PM', distance: '0.00 KM' },
//     { hour: '23th', time: '10:01PM 11:00PM', distance: '0.00 KM' },
//     { hour: '24th', time: '11:01PM 12:00AM', distance: '0.00 KM' },
// ];

// const columns = [
//     {
//       name: 'Hour',
//       selector: 'hour',
//       sortable: true,
//     },
//     {
//       name: 'Time',
//       selector: 'time',
//       sortable: true,
//     //   right: true,
//     },
//     {
//         name: 'Distance',
//         selector: 'distance',
//         sortable: true
//     }
// ];

// const DataTable = styled`
//     font-weight: bold;
// `

class VehicleReport extends React.Component {
    state = {  }

    goToDeviceListHandler = () =>{
        this.props.changeState(0)
    }

    render() { 
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">&nbsp;</h1>
                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                     <FontAwesomeIcon icon={faDownload} /> Download Report
                    </button>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-center text-primary">VEHICLE REPORTS</h6>
                    </div>
                    <div className="card-body">
                        {/* <DataTable
                            columns={columns}
                            data={data}
                        /> */}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default VehicleReport;