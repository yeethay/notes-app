import React from 'react';
import PropTypes from 'prop-types';

const HeadingOne = props => {
  return <h1 {...props.attributes}>{props.children}</h1>;
};

HeadingOne.propTypes = {
  attributes: PropTypes.node,
  children: PropTypes.node,
};

export default HeadingOne;
