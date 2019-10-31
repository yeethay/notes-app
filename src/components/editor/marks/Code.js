import React from 'react';
import PropTypes from 'prop-types';

const CodeMark = props => <code {...props.attributes}>{props.children}</code>;

CodeMark.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.node,
};

export default CodeMark;
