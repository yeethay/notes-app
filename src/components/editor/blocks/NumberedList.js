import React from 'react';
import PropTypes from 'prop-types';

const NumberedList = props => {
  return <ol {...props.attributes}>{props.children}</ol>;
};

NumberedList.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.node,
};

export default NumberedList;
