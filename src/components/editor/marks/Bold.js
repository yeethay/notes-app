import React from 'react';
import PropTypes from 'prop-types';

const BoldMark = props => (
  <strong {...props.attributes}>{props.children}</strong>
);

BoldMark.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.node,
};

export default BoldMark;
