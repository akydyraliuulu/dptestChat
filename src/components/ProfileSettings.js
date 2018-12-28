import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { userActions } from "../actions/UserActions";
import LogoutComponent from "./LogoutComponent";

class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    let user = sessionStorage.getItem("user");
    user = JSON.parse(user);
    if (user && user !== null && user.username !== "") {
      this.props.login(user);
    }
    this.state = {
      username: "",
      password: "",
      error: "",
      required: "",
      file: null,
      review: ""
    };
    this.onImageChange = this.onImageChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      userId: this.props.user.userId,
      username: this.props.user.username,
      password: this.props.user.password,
      review: this.props.user.avatarUrl
    });
  }

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.onHandleClick();
    }
  };

  onHandleClick = () => {
    const { username, password, userId } = this.state;

    var data = {
      user: {
        userId: userId,
        username: username,
        password: password,
        avatarImg: this.state.file
      }
    };

    console.log(data);

    axios.post("/api/users/register/update", data).then(res => {
      console.log("res", res);
      this.onUpdateSuccess(res.data);
    });
  };

  onUpdateSuccess = res => {
    switch (res.status) {
      case "success":
        console.log("res.user");
        console.log(res.user);
        this.props.login(res.user);
        var userToSave = JSON.stringify(res.user);
        sessionStorage.setItem("user", userToSave);
        break;
      case "error":
        console.log("errorResponse");
        console.log(res.hint);
        if (res.hint === "required") {
          if (this.state.username === "") {
            this.setState({ error: "username is required" });
          } else if (this.state.password === "") {
            this.setState({ required: "password is required" });
          }
        }
        break;
      case "verifiedTrue":
        console.log("verifiedTrue");
        console.log(res.error);
        this.setState({ error: res.error });
        break;
      default:
    }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    if (name === "username") {
      this.setState({ error: "" });
    } else {
      this.setState({ required: "" });
    }
  };

  onImageChange(e) {
    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = e => {
        console.log("img data", e.target.result);
        this.setState({
          file: e.target.result,
          review: e.target.result
        });
      };
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className='profileSettings' container spacing={24}>
        <LogoutComponent />
        <FormControl
          style={{
            marginTop: 60,
            alignItems: "center",
            alignContent: "center"
          }}
        >
          <Typography gutterBottom variant='outlined' component='h1'>
            Profile Settings
          </Typography>
          <Input
            style={{ display: "none" }}
            type='file'
            onChange={this.onImageChange}
            inputRef={fileInput => (this.fileInput = fileInput)}
          />
          <Avatar
            style={{
              margin: 10,
              width: 70,
              height: 70
            }}
            onClick={() => this.fileInput.click()}
            src={this.state.review}
          >
            <AddPhotoIcon />
          </Avatar>

          <TextField
            id='outlined-dense'
            label={this.state.error ? this.state.error : "username"}
            variant='outlined'
            margin='normal'
            onChange={this.handleChange("username")}
            value={username}
            onKeyPress={this.handleKeyPress}
            error={this.state.error}
            placeholder='username'
          />
          <TextField
            id='outlined-dense'
            label={this.state.required ? this.state.required : "password"}
            margin='normal'
            variant='outlined'
            onChange={this.handleChange("password")}
            value={password}
            onKeyPress={this.handleKeyPress}
            type='password'
            error={this.state.required}
            placeholder='********'
          />
          <Button
            size='large'
            variant='outlined'
            color='primary'
            margin='normal'
            type='submit'
            onClick={this.onHandleClick}
          >
            Update
          </Button>
        </FormControl>
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
