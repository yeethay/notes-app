import React from 'react';
import Icon from 'react-icons-kit';
import classNames from 'classnames';
import './ToolbarButton.css';

interface IProps {
  active: boolean;
  onPointerDown: any;
  icon: typeof Icon;
}

const ToolbarButton = (props: IProps) => {
  let classes = classNames('tooltip-icon-button', {
    active: props.active,
  });
  return (
    <button className={classes} onPointerDown={props.onPointerDown}>
      <Icon icon={props.icon} />
    </button>
  );
};

export default ToolbarButton;
