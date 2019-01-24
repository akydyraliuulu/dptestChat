import { connect } from "react-redux";
import GiftsEditorComponent from "./GiftsEditorComponent";

const mapStateToProps = (state, ownProps) => {
  return {
    inputPersonId: state.userReducer.user._id,
    inputPersonPassword: state.userReducer.user.password
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const GiftsEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftsEditorComponent);

export default GiftsEditorContainer;
