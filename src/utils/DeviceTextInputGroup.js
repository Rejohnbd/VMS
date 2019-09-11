import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DeviceTextInputGroup = ({
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
        <div className="form-group">
            <label 
                htmlFor={id} 
                className="col-form-label">
                {label}
            </label>
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
    );
}

DeviceTextInputGroup.propTypes = {
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

export default DeviceTextInputGroup;