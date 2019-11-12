import React from 'react';
import SyncedStatus from '../SyncedStatus';
import './LastModified.css';

interface IProps {
  date: number;
  user: firebase.User | undefined;
  synced: boolean;
}

const LastModified = (props: IProps) => (
  <div>
    <div className="last-modified">
      Last modified on {convertEpochToDate(props.date)}
      &nbsp;
      {props.user && <SyncedStatus synced={props.synced} />}
    </div>
  </div>
);

const convertEpochToDate = (epoch: number) => {
  return new Date(epoch).toLocaleString();
};

export default LastModified;
