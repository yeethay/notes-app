import React from 'react';
import PropTypes from 'prop-types';

const BulletedList = props => <ul {...props.attributes}>{props.children}</ul>;

BulletedList.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.node,
};

export default BulletedList;
