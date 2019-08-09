import Navigator from "./Navigator-view";
import { connect } from "react-redux";

const mapStateToProps = ({ notesList }) => ({ notesList });
export default connect(mapStateToProps)(Navigator);
