import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import DataTable from 'react-data-table-component';
import { Datatable } from "@o2xp/react-datatable";
// import VisibilityIcon from '@material-ui/icons/Visibility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEye,
} from '@fortawesome/free-solid-svg-icons';
import { store } from 'react-notifications-component';
// Redux
import { connect } from 'react-redux';
import { getUsers } from '../../redux/actions/UserAction';


class UserList extends React.Component {
    state = {} 

    componentDidMount() {
        this.props.getUsers();
    }

    goToUserDetail = (user) => {
        if(user.length > 1 ){
            store.addNotification({
                title: "You Select Multiple Users!",
                message: "Please select only one user to show details",
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

        console.log(user.length);
    }

    render() {
      const { users } = this.props;
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
            keyColumn: 'email',
            data: {
                columns: [ 
                    { id: "id", label: "USERID" },
                    { id: "name", label: "USER NAME" },
                    { id: "contact", label: "USER PHONE" },
                    { id: "email", label: "USER EMAIL" },
                    { id: "organization_name", label: "USER ORGANIZATION" },
                    { id: "address", label: "USER ADDRESS"},
                    { id: "actions", label: "ACTIONS"}
                ],
                rows: users
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
                    columnsOrder: ["name", "contact", "email", "organization_name", "address"]
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
                        <h6 className="m-0 font-weight-bold text-center text-primary">ALL USERS LIST</h6>
                    </div>
                    <Datatable 
                        options={options}
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