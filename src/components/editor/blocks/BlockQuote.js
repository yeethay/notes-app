import React from 'react';
import PropTypes from 'prop-types';

const BlockQuote = props => {
  return <blockquote {...props.attributes}>{props.children}</blockquote>;
};

BlockQuote.propTypes = {
  attributes: PropTypes.node,
  children: PropTypes.node,
};

export default BlockQuote;
