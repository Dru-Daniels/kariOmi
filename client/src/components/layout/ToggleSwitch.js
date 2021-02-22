import React from "react";
import PropTypes from "prop-types";

const ToggleSwitch = ({ id, name, checked, onChange, optionLabels, small, disabled }) => {

  return ( 
    <div className={ "toggleWrapper toggle-switch" + (small ? " small-switch" : "")}>
      <p className='toggle-question'>Performance Ready?</p>
      <input
        type="checkbox"
        name={name}
        className="toggle-switch-checkbox dn" 
        id='dn'
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled={disabled}
        />
        {id ? (
          <label className="toggle-switch-label toggle" htmlFor='dn'>
            <span className="toggle__handler">
              <span className="crater crater--1"></span>
              <span className="crater crater--2"></span>
              <span className="crater crater--3"></span>
            </span>
            <span className="star star--1"></span>
            <span className="star star--2"></span>
            <span className="star star--3"></span>
            <span className="star star--4"></span>
            <span className="star star--5"></span>
            <span className="star star--6"></span>
            
            <span
              className={
                disabled
                  ? "toggle-switch-inner toggle-switch-disabled"
                  : "toggle-switch-inner"
              }
              data-yes={optionLabels[0]}
              data-no={optionLabels[1]}
            />
            <span
              className={
              disabled
                ? "toggle-switch-switch toggle-switch-disabled"
                : "toggle-switch-switch"
              }
            />
          </label>
        ) : null}
      </div>
    );
}

// Set optionLabels for rendering.
ToggleSwitch.defaultProps = {
  optionLabels: ["Yes", "No"],
}

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  optionLabels: PropTypes.array,
  small: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ToggleSwitch;