import React from 'react';
import Icon from 'react-icons-kit';
import classNames from 'classnames';
import './ToolbarButton.css';

interface IProps {
  active: boolean;
  onPointerDown: (e: PointerEvent) => void;
  icon: any;
}

const ToolbarButton = (props: IProps) => {
  let classes = classNames('tooltip-icon-button', {
    active: props.active,
  });
  return (
    <button
      className={classes}
      onPointerDown={(
        e: PointerEvent | React.PointerEvent<HTMLButtonElement>
      ) => props.onPointerDown(e as PointerEvent)}
    >
      <Icon icon={props.icon} />
    </button>
  );
};

export default ToolbarButton;
