import React from 'react';
import PropTypes from 'prop-types';

const ListItem = props => <li {...props.attributes}>{props.children}</li>;

ListItem.propTypes = {
  attributes: PropTypes.node,
  children: PropTypes.node,
};

export default ListItem;
