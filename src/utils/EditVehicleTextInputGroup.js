import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const EditVehicleTextInputGroup = ({
    id,
    label,
    name,
    type,
    placeholder,
    value,
    onChange,
    error
}) => {
    return(
        <div className="form-group row">
            <label 
                htmlFor={id} 
                className="col-sm-2 col-form-label">
                    {label}
            </label>
            <div className="col-sm-10">
                <input 
                    type={type}
                    name={name} 
                    className={ classnames(
                        'form-control form-control-user ', 
                        {'is-invalid': error}
                    )}  
                    id={id} 
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {
                    error && <div className="invalid-feedback">{error}</div>
                }
            </div>
        </div>
        // <div className="form-group">
        //     <input 
        //         name={name}
        //         type={type}
        //         className={ classnames(
        //             'form-control form-control-user ', 
        //             {'is-invalid': error}
        //         )}  
        //         placeholder={placeholder}
        //         value={value}
        //         onChange={onChange} 
        //     />
        //     {
        //         error && <div className="invalid-feedback">{error}</div>
        //     }
        // </div>
    );
}

EditVehicleTextInputGroup.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    value: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    error: PropTypes.string
}

export default EditVehicleTextInputGroup;