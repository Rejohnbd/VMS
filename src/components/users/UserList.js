import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import DataTable from 'react-data-table-component';
import { Datatable } from "@o2xp/react-datatable";
// Redux
import { connect } from 'react-redux';
import { getUsers } from '../../redux/actions/UserAction';


class UserList extends React.Component {
    state = {}

    actionsRow = ({ type, payload }) => {
        console.log(type);
        console.log(payload);
      };   


    componentDidMount() {
        this.props.getUsers();
    }

    render() {
      const { users } = this.props;
    //   console.log(users)
      let options  = {
            keyColumn: 'id',
            dimensions: {
                datatable: {
                    height: '600',
                    width: '100%'
                }
            },
            refreshRows: true,
            features: {
                canSearch: true,
                canDownload: true,
                canPrint: true,
                // canRefreshRows: true,
                canOrderColumns: true
            },
            data: {
                columns: [ 
                    { id: "name", label: "USER NAME" },
                    { id: "contact", label: "USER PHONE" },
                    { id: "email", label: "USER EMAIL" },
                    { id: "organization_name", label: "USER ORGANIZATION" },
                    { id: "address", label: "USER ADDRESS"}
                ],
                rows: users
            }
        } 
        return (
            <Fragment>
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
                    <Datatable 
                        options={options}
                        actions={this.actionsRow}
                        
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