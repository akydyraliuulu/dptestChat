import axios from "axios";
import classNames from "classnames";
import { Card } from "material-ui/Card";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {
  blue500,
  grey300,
  grey400,
  lightGreenA400,
  red500,
  yellowA400
} from "material-ui/styles/colors";
import TextField from "material-ui/TextField";
import React, { Component } from "react";
import AvatarEditor from "react-avatar-editor";
import DropZone from "react-dropzone";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { userActions } from "../actions/UserActions";
import AppBarComponent from "./AppBarComponent";
import { IconButton, Input } from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditRounded";

const styles = {
  hintStyle: {
    color: lightGreenA400
  },
  errorStyle: {
    color: red500
  },
  noErrorStyle: {
    color: grey400
  }
};

class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    let user = sessionStorage.getItem("user");
    user = JSON.parse(user);
    if (user && user !== null && user.username !== "") {
      this.props.login(user);
    }
    this.state = {
      inputPersonId: "",
      confirmDialogOpen: false,
      avatarScale: 1,
      avatarRotation: 0,
      confirmDialogFunction: null,
      confirmDialogTitle: "",
      confirmDialogPassword: "",
      confirmDialogErrorMessage: "",
      confirmChangePasswordDialogOpen: false,
      confirmChangePasswordDialogTitle:
        "Would you like to change your password?",
      password: "",
      passwordConfirm: "",
      changePasswordErrors: {
        password: "",
        passwordConfirm: ""
      },
      changePasswordHints: {
        password: "",
        passwordConfirm: ""
      },
      userSettingsToChange: {
        username: "",
        password: "",
        avatarUrl: ""
      }
    };
  }

  componentWillMount() {
    let inputPersonId = this.props.user._id;
    this.setState({
      inputPersonId: inputPersonId,
      userSettingsToChange: {
        username: this.props.user.username,
        password: this.props.user.password,
        avatarUrl: this.props.user.avatarUrl
      }
    });
  }

  onInputChange = event => {
    const field = event.target.name;
    const userSettingsToChange = this.state.userSettingsToChange;
    userSettingsToChange[field] = event.target.value;

    this.setState({
      userSettingsToChange
    });
  };
  resetField = fieldName => {
    const userSettingsToChange = this.state.userSettingsToChange;
    userSettingsToChange[fieldName] = this.props.user[fieldName];

    this.setState({
      userSettingsToChange
    });
    this.forceUpdate();
  };

  confirmUpdateName = () => {
    this.setState({
      confirmDialogTitle: "Would you like to change username?"
    });
    this.handleConfirmDialogOpen(this.updateName);
  };

  updateName = () => {
    let data = {
      inputPersonPassword: this.state.confirmDialogPassword,
      _id: this.props.user._id,
      newName: this.state.userSettingsToChange.username
    };

    axios.post("/api/users/profileSettings/changeName", data).then(res => {
      console.log("res", res);
      this.onNameChanged(res.data);
    });
  };

  onNameChanged = res => {
    if (res.status === "success") {
      this.props.login(res.user);
      var userToSave = JSON.stringify(res.user);
      sessionStorage.setItem("user", userToSave);
      this.handleConfirmDialogClose();
    }
    if (res.status === "error") {
      this.setState({
        confirmDialogErrorMessage: res.error
      });
    }
  };

  confirmUpdateAvatar = () => {
    this.setState({
      confirmDialogTitle: "Would you like to change profile image?"
    });
    this.handleConfirmDialogOpen(this.updateAvatar);
  };
  updateAvatar = () => {
    const canvas = this.avatarEditor.getImage();
    const dataUrl = canvas.toDataURL();
    let data = {
      inputPersonPassword: this.state.confirmDialogPassword,
      _id: this.props.user._id,
      userId: this.props.user.userId,
      newAvatarImg: dataUrl
    };

    axios.post("/api/users/profileSettings/changeAvatar", data).then(res => {
      console.log("res", res);
      this.onAvatarChanged(res.data);
    }).catch(function (error) {
      console.log(error);
    });
  };

  onAvatarChanged = res => {
    if (res.status === "success") {
      this.props.login(res.user);
      var userToSave = JSON.stringify(res.user);
      sessionStorage.setItem("user", userToSave);
      this.handleConfirmDialogClose();
    }
    if (res.status === "error") {
      this.setState({
        confirmDialogErrorMessage: res.error
      });
    }
  };

  setAvatarEditorRef = avatarEditor => (this.avatarEditor = avatarEditor);

  handleConfirmDialogOpen = func => {
    this.setState({
      confirmDialogOpen: true,
      confirmDialogFunction: func
    });
  };

  handleConfirmDialogClose = () => {
    this.setState({
      confirmDialogOpen: false,
      confirmDialogTitle: "",
      confirmDialogFunction: null,
      confirmDialogPassword: "",
      confirmDialogErrorMessage: ""
    });
  };

  onConfirmDialogPasswordChange = event => {
    this.setState({
      confirmDialogPassword: event.target.value
    });
  };

  handleDrop = dropped => {
    var newUserSettingsToChange = this.state.userSettingsToChange;
    newUserSettingsToChange.avatarUrl = dropped[0];
    this.setState({ userSettingsToChange: newUserSettingsToChange });
  };

  handleConfirmChangePasswordDialogOpen = () => {
    this.setState({
      confirmChangePasswordDialogOpen: true
    });
  };

  handleConfirmChangePasswordDialogClose = () => {
    this.setState({
      confirmChangePasswordDialogOpen: false,
      confirmDialogErrorMessage: "",
      password: "",
      passwordConfirm: ""
    });
  };

  confirmChangePassword = () => {
    let data = {
      _id: this.props.user._id,
      inputPersonId: this.state.inputPersonId,
      inputPersonPassword: this.state.confirmDialogPassword,
      newPassword: this.state.password
    };

    axios.post("/api/users/profileSettings/changePassword", data).then(res => {
      console.log("res", res);
      this.onPasswordChanged(res.data);
    });
  };

  onPasswordChanged = res => {
    if (res.status === "success") {
      console.log("respassword", res);
      this.props.login(res.user);
      var userToSave = JSON.stringify(res.user);
      sessionStorage.setItem("user", userToSave);
      this.handleConfirmChangePasswordDialogClose();
    }
    if (res.status === "error") {
      this.setState({
        confirmDialogErrorMessage: res.error
      });
    }
  };

  checkPassword = () => {
    this.checkPasswordConfirm();

    let data = {
      password: this.state.password
    };

    axios
      .post("/api/users/profileSettings/validatePassword", data)
      .then(res => {
        console.log("res", res);
        this.setPasswordState(res);
      });
  };

  setPasswordState = res => {
    var state = this.state;
    state.changePasswordErrors.password = res.error;
    state.changePasswordHints.password = res.hint;

    this.setState(state);
  };

  checkPasswordConfirm = () => {
    var state = this.state;

    if (this.state.password === "" || this.state.passwordConfirm === "") return;

    if (this.state.password === this.state.passwordConfirm) {
      state.changePasswordErrors.passwordConfirm = "";
      state.changePasswordHints.passwordConfirm = "Password OK";

      this.setState(state);
    } else {
      state.changePasswordErrors.passwordConfirm = "Passwords did not match";
      state.changePasswordHints.passwordConfirm = "";

      this.setState(state);
    }
  };

  onChangePasswordChange = event => {
    const field = event.target.name;

    if (field === "newAccountPasswordConfirm") {
      this.checkPasswordConfirm();
      this.setState({
        passwordConfirm: event.target.value
      });
    }
    if (field === "newAccountPassword") {
      this.setState({
        password: event.target.value
      });
    }
  };

  render() {
    const confirmPasswordChangeMessage = (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h6>Please enter your password.</h6>
          <a style={{ color: "red" }}>{this.state.confirmDialogErrorMessage}</a>
          <TextField
            floatingLabelText='My password'
            floatingLabelFixed={true}
            value={this.state.confirmDialogPassword}
            onChange={this.onConfirmDialogPasswordChange}
            type='password'
            name='confirmDialogPassword'
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h6>Please enter a new password.</h6>
          <TextField
            onBlur={this.checkPassword}
            floatingLabelStyle={
              this.state.changePasswordErrors.password === ""
                ? styles.noErrorStyle
                : styles.errorStyle
            }
            onChange={this.onChangePasswordChange}
            errorText={
              this.state.changePasswordHints.password === ""
                ? this.state.changePasswordErrors.password
                : this.state.changePasswordHints.password
            }
            errorStyle={
              this.state.changePasswordHints.password === ""
                ? styles.errorStyle
                : styles.hintStyle
            }
            value={this.state.password}
            floatingLabelText='New password'
            floatingLabelFixed={true}
            type='password'
            name='newAccountPassword'
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h6>Please re-enter new password.</h6>
          <TextField
            onBlur={this.checkPasswordConfirm}
            floatingLabelStyle={
              this.state.changePasswordErrors.passwordConfirm === ""
                ? styles.noErrorStyle
                : styles.errorStyle
            }
            onChange={this.onChangePasswordChange}
            errorText={
              this.state.changePasswordHints.passwordConfirm === ""
                ? this.state.changePasswordErrors.passwordConfirm
                : this.state.changePasswordHints.passwordConfirm
            }
            errorStyle={
              this.state.changePasswordHints.passwordConfirm === ""
                ? styles.errorStyle
                : styles.hintStyle
            }
            value={this.state.passwordConfirm}
            floatingLabelText='Re-enter new password'
            floatingLabelFixed={true}
            type='password'
            name='newAccountPasswordConfirm'
          />
        </div>
      </div>
    );

    const confirmMessage = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h6>Please enter your password.</h6>
        <a style={{ color: "red" }}>{this.state.confirmDialogErrorMessage}</a>
        <TextField
          floatingLabelText='password'
          floatingLabelFixed={true}
          value={this.state.confirmDialogPassword}
          onChange={this.onConfirmDialogPasswordChange}
          type='password'
          name='confirmDialogPassword'
        />
      </div>
    );

    const actions = [
      <FlatButton
        label='cancel'
        primary={true}
        onClick={this.handleConfirmDialogClose}
      />,
      <FlatButton
        label='save confirmation'
        primary={true}
        keyboardFocused={true}
        onClick={this.state.confirmDialogFunction}
      />
    ];
    const changePasswordActions = [
      <FlatButton
        label='cancel'
        primary={true}
        onClick={this.handleConfirmChangePasswordDialogClose}
      />,
      <FlatButton
        label='edit'
        disabled={
          this.state.changePasswordHints.password === "" ||
          this.state.changePasswordHints.passwordConfirm === ""
        }
        primary={true}
        keyboardFocused={true}
        onClick={this.confirmChangePassword}
      />
    ];

    return (
      <div>
        <AppBarComponent />
        <Card className='CONTAINER' style={{ padding: "40px" }}>
          <h2 className='CARD-HEADING'>Profile</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <DropZone
              onDrop={this.handleDrop}
              disableClick
              style={{ width: "350px", height: "350px" }}
            >
              {({ getRootProps, getInputProps, isDragActive }) => {
                return (
                  <div
                    {...getRootProps()}
                    className={classNames("dropzone", {
                      "dropzone--isActive": isDragActive
                    })}
                  >
                    <input {...getInputProps()} />

                    <AvatarEditor
                      ref={this.setAvatarEditorRef}
                      image={this.state.userSettingsToChange.avatarUrl}
                      width={200}
                      height={200}
                      border={25}
                      rotate={this.state.avatarRotation}
                      color={[0, 204, 204, 0.6]} // RGBA
                      borderRadius={100}
                      scale={this.state.avatarScale}
                      title='Drag the image and drop here'
                    />
                  </div>
                );
              }}
            </DropZone>
            <div style={{ paddingLeft: "40px" }}>
              <RaisedButton
                onClick={this.confirmUpdateAvatar}
                disabled={
                  this.state.userSettingsToChange.avatarUrl ===
                  this.props.user.avatarUrl
                }
                backgroundColor={yellowA400}
                label='update'
              />
              <FlatButton
                onClick={() => {
                  this.resetField("avatarUrl");
                }}
                disabled={
                  this.state.userSettingsToChange.avatarUrl ===
                  this.props.user.avatarUrl
                }
                label='reset'
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TextField
              floatingLabelText='username'
              floatingLabelFixed={true}
              underlineStyle={{
                borderColor: `${
                  this.state.userSettingsToChange.username ===
                  this.props.user.username
                    ? grey300
                    : yellowA400
                }`
              }}
              floatingLabelStyle={{
                color: `${
                  this.state.userSettingsToChange.username ===
                  this.props.user.username
                    ? grey300
                    : yellowA400
                }`
              }}
              floatingLabelFocusStyle={{ color: blue500 }}
              value={this.state.userSettingsToChange.username}
              onChange={this.onInputChange}
              name='username'
            />
            <RaisedButton
              onClick={this.confirmUpdateName}
              disabled={
                this.state.userSettingsToChange.username ===
                this.props.user.username
              }
              backgroundColor={yellowA400}
              label='edit'
            />
            <FlatButton
              onClick={() => {
                this.resetField("username");
              }}
              disabled={
                this.state.userSettingsToChange.username ===
                this.props.user.username
              }
              label='reset'
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Input style={{ marginRight: "40px" }}
              value={this.state.userSettingsToChange.password}
              disabled
              type='password'
              inputProps={{
                "aria-label": "Description"
              }}
            />

            <IconButton
              style={{ marginLeft: "40px" }}
              onClick={this.handleConfirmChangePasswordDialogOpen}
              backgroundColor={yellowA400}
              label='edit'
            >
              <EditIcon />
            </IconButton>
            <FlatButton
              onClick={() => {
                this.resetField("password");
              }}
              disabled={
                this.state.userSettingsToChange.password ===
                this.props.user.password
              }
              label='reset'
            />
            
          </div>
        </Card>

        <Dialog
          title={this.state.confirmDialogTitle}
          actions={actions}
          modal={false}
          open={this.state.confirmDialogOpen}
          onRequestClose={this.handleConfirmDialogClose}
        >
          {confirmMessage}
        </Dialog>
        <Dialog
          title={this.state.confirmChangePasswordDialogTitle}
          actions={changePasswordActions}
          modal={false}
          open={this.state.confirmChangePasswordDialogOpen}
          onRequestClose={this.handleConfirmChangePasswordDialogClose}
        >
          {confirmPasswordChangeMessage}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

function mapDispatchToProps(dispatch) {
  return {
    login: function(user) {
      dispatch(userActions.login(user));
    }
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfileSettings)
);
