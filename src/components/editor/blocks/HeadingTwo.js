import React from 'react';
import PropTypes from 'prop-types';

const HeadingTwo = props => {
  return <h2 {...props.attributes}>{props.children}</h2>;
};

HeadingTwo.propTypes = {
  attributes: PropTypes.node,
  children: PropTypes.node,
};

export default HeadingTwo;
