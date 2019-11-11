import LastModified from './LastModified-view';
import { connect } from 'react-redux';

const mapStateToProps = user => user;

export default connect(mapStateToProps)(LastModified);
