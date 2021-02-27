import React from "react";
import PropTypes from "prop-types";

const ToggleSwitch = ({ id, name, checked, onChange, optionLabels, small, disabled, aboveText, belowText }) => {
  
  const showText = () => {
    var top = document.getElementById('top-text')
    var bottom = document.getElementById('bottom-text')
    if (checked) {
      top.style.display = 'flex'
      bottom.style.display = 'none'
    } else {
      top.style.display = 'none'
      bottom.style.display = 'flex'
    }
  }
  
  return (
    <div className={ "toggle-switch" + (small ? " small-switch" : "")}>
    {/* <p id='top-text'>{aboveText}</p> */}
    {/* <p id='bottom-text'>{belowText}</p> */}
    <input
    type="checkbox"
    name={name}
    className="toggle-switch-checkbox dn" 
    id='dn'
    checked={checked}
    onChange={e => onChange(e.target.checked)}
    disabled={disabled}
    onClick={showText}
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
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  optionLabels: PropTypes.array,
  small: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ToggleSwitch;