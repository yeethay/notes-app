import React from 'react';
import PropTypes from 'prop-types';
import './styles/LastModified.css';

const LastModified = props => (
  <p className="last-modified">
    Last modified on {convertEpochToDate(props.date)}
  </p>
);

const convertEpochToDate = epoch => {
  return new Date(epoch).toLocaleString();
};

LastModified.propTypes = {
  date: PropTypes.number,
};

export default LastModified;
