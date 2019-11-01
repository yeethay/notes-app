import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import classNames from 'classnames';

const ToolbarButton = props => {
  let classes = classNames('tooltip-icon-button', {
    active: props.active,
  });
  return (
    <button className={classes} onPointerDown={props.onPointerDown}>
      <Icon icon={props.icon} />
    </button>
  );
};

ToolbarButton.propTypes = {
  active: PropTypes.bool,
  onPointerDown: PropTypes.func,
  icon: PropTypes.object,
};

export default ToolbarButton;
