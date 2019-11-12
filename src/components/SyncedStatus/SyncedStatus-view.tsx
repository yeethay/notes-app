import React, { Fragment } from 'react';
import { Spinner } from 'react-bootstrap';
import Icon from 'react-icons-kit';
import { ic_done } from '../../utils/icons';

interface IProps {
  synced: boolean;
}

const SyncedStatus = (props: IProps) => {
  return (
    <Fragment>
      {props.synced === false ? (
        <Spinner size="sm" animation="grow" role="status" />
      ) : (
        <Icon icon={ic_done} />
      )}
    </Fragment>
  );
};

export default SyncedStatus;
