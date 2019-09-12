import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import { Datatable } from "@o2xp/react-datatable";

// Redux
import { connect } from "react-redux";



class DeviceList extends React.Component {
    state = {  }
    render() {
        let options  = {
            keyColumn: 'id',
            dimensions: {
                datatable: {
                    height: '600'
                }
            },
            features: {
                canSearch: true,
                canDownload: true,
                canPrint: true,
                canOrderColumns: true
            },
            data: {
                columns: [ 
                    {
                        id: "id",
                        label: "id",
                        colSize: "80px"
                    },
                    {
                        id: "name",
                        label: "name",
                        colSize: "150px"
                    },
                    {
                        id: "age",
                        label: "age",
                        colSize: "50px"
                    },
                ],
                rows: [
                    {
                        id: "50cf",
                        age: 28,
                        name: "Kerr Mayo"
                    },
                    {
                        id: "209",
                        age: 34,
                        name: "Freda Bowman"
                    },
                    {
                        id: "2dd81ef",
                        age: 14,
                        name: "Becky Lawrence"
                    }
                ],
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

}

const mapStateToProps = (state) => {

}
 
export default connect(
    // mapStateToProps,
    null
)(DeviceList);