import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const LoginTextInputGroup = ({
    name,
    type,
    placeholder,
    value,
    onChange,
    error
}) => {
    return(
        <div className="form-group">
            <input 
                name={name}
                type={type}
                className={ classnames(
                    'form-control form-control-user ', 
                    {'is-invalid': error}
                )}  
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required 
            />
            {
                error && <div className="invalid-feedback">{error}</div>
            }
        </div>
    );
}

LoginTextInputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
}

export default LoginTextInputGroup;