import SyncedStatus from './SyncedStatus-view';
import { connect } from 'react-redux';

const mapStateToProps = ({ syncedStatus }) => ({ syncedStatus });

export default connect(mapStateToProps)(SyncedStatus);
