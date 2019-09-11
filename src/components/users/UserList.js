import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import DataTable from 'react-data-table-component';
import DataTable from 'react-redux-datatable';
import 'react-redux-datatable/dist/styles.css'
// Redux
import { connect } from 'react-redux';
import { getUsers } from '../../redux/actions/UserAction';

// const columns = [
//   {
//     name: 'User Name',
//     selector: 'name',
//     sortable: true,
//   },
//   {
//     name: 'User Email',
//     selector: 'email',
//     sortable: true
//   },
//   {
//     name: 'User Phone',
//     selector: 'contact',
//     sortable: true,
//   },
//   {
//     name: 'User Address',
//     selector: 'address',
//     sortable: true,
//   },
//   {
//     name: 'User Organization',
//     selector: 'organization_name',
//     sortable: true,
//   },
//   {
//     name: 'Action',
//     selector: 'action'
//     // allowOverFlow: true,
//     // button: true
//   },
// ];

const tableSettings = {
  tableID: 'DataTable',
  keyField: 'ref_id',
  tableColumns: [
      {
          title: 'Ref',
          key: 'ref_id',
          filter: 'NumberFilter',
          defaultValue: { comparator: '=' },
      },
      {
          title: 'First Name',
          key: 'first_name',
      },
      {
          title: 'Surname',
          key: 'surname',
      },
      {
          title: 'Type',
          key: 'type',
          filter: 'SelectFilter',
          filterOptions: {
              Add: 'Add',
              Amend: 'Amend',
              Remove: 'Remove',
          },
      },
  ],
};



class UserList extends React.Component {
    state = {}

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
      const { users } = this.props;
      // console.log(users);
        return (
            <Fragment>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">All Users List</h1>
                </div>
                <div className="card shadow mb-4" >
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-center text-primary">All Users List </h6>
                    </div>
                    {/* <DataTable
                        columns = {columns}
                        data = {this.props.users}
                        // fixedHeader
                        // fixedHeaderScrollHeight="6000px"
                        pagination
                    /> */}

                <DataTable
                      tableSettings={tableSettings}
                      apiLocation={users}
                    />
                </div>
            </Fragment>
        );
    }
}

UserList.propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    users: state.user.users
})
 
export default connect(
    mapStateToProps,
    { getUsers }
)(UserList);