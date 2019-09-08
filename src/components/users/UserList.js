import React, {Fragment} from 'react';
import DataTable from 'react-data-table-component'

class UserList extends React.Component {
    state = {  }
    render() { 
        return (
            <Fragment>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">All Users List</h1>
                </div>
                <div className="card shadow mb-4" >
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-center text-primary">All Users List </h6>
                    </div>
                </div>
            </Fragment>
        );
    }
}
 
export default UserList;