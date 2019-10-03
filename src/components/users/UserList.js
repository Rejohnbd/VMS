import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { Datatable } from "@o2xp/react-datatable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEye,
} from '@fortawesome/free-solid-svg-icons';
import { store } from 'react-notifications-component';
// Redux
import { connect } from 'react-redux';


class UserList extends React.Component {
    state = {} 

    componentDidMount() {
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

        if(user.length == 1) {
            let userObj =  {};
            user.map(user=> {
                userObj = user
            })
            this.props.goToUserDetails(userObj);
        }
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
                    { id: "name", label: "USER NAME" },
                    { id: "contact", label: "USER PHONE" },
                    { id: "email", label: "USER EMAIL" },
                    { id: "organization_name", label: "USER ORGANIZATION" },
                    { id: "address", label: "USER ADDRESS"}
                ],
                rows: users
            },
            features: {
                selectionIcons: [
                    {
                        title: 'View User Details',
                        icon: <FontAwesomeIcon icon={faEye} style={{color: '#3f51b5'}} />,
                        onClick: (user) => this.goToUserDetail(user)
                    },
                ],
                canPrint: true,
                canDownload: true,
                canSearch: true,
                canOrderColumns: true,
                canSelectRow: true,
                canSaveUserConfiguration: true,
                userConfiguration: {
                    columnsOrder: ["name", "contact", "email", "organization_name", "address"]
                },
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
    users: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    users: state.user.users
})
 
export default connect(
    mapStateToProps,
    null
)(UserList);