import React from 'react';
import PropTypes from 'prop-types';

const ItalicMark = props => (
  <em property="italic" {...props.attributes}>
    {props.children}
  </em>
);

ItalicMark.propTypes = {
  attributes: PropTypes.node,
  children: PropTypes.node,
};

export default ItalicMark;
