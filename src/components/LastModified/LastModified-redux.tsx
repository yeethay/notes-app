import LastModified from './LastModified-view';
import { connect } from 'react-redux';

const mapStateToProps = (user: firebase.User) => user;

export default connect(mapStateToProps)(LastModified);
