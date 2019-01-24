import { withStyles } from "@material-ui/core/styles";
import { Card } from "material-ui/Card";
import Label from "material-ui/Card/CardTitle";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import Slider from "material-ui/Slider";
import { blue500, grey300, grey400, lightGreenA400, red500, yellowA400 } from "material-ui/styles/colors";
import TextField from "material-ui/TextField";
import React from "react";
import AvatarEditor from "react-avatar-editor";
import DropZone from "react-dropzone";
//import "react-quill/dist/quill.snow.css";
import { withRouter } from "react-router-dom";
import addGift from "../../../utils/addGift";


const styles = theme => ({
  hintStyle: {
    color: lightGreenA400
  },
  errorStyle: {
    color: red500
  },
  noErrorStyle: {
    color: grey400
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 420,
    maxWidth: 800
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
});

class GiftSettingsComponent extends React.Component {
  state = {
    inputPersonId: "",
    confirmDialogOpen: false,
    avatarScale: 1,
    avatarRotation: 0,
    confirmDialogFunction: null,
    confirmDialogTitle: "",
    confirmDialogErrorMessage: "",
    giftSettingsToChange: {
      giftId: "",
      title: "",
      imgUrl: ""
    }
  };

  modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"]
    ]
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "size",
    "color",
    "background",
    "font",
    "align",
    "link",
    "image"
  ];

  componentDidMount() {
    var inputPersonId = this.props.inputPersonId;

    // let roomIds = this.props.gift.rooms.map(room => { return room.roomId});

    this.setState({
      inputPersonId: inputPersonId,
      giftSettingsToChange: {
        giftId: this.props.gift.giftId,
        title: this.props.gift.title,
        imgUrl: this.props.gift.imgUrl
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    // let roomIds = this.props.gift.rooms.map(room => {return room.roomId});

    this.setState({
      giftSettingsToChange: {
        giftId: nextProps.gift.giftId,
        title: nextProps.gift.title,
        imgUrl: nextProps.gift.imgUrl
      }
    });
  }

  onInputChange = event => {
    const field = event.target.name;
    const giftSettingsToChange = this.state.giftSettingsToChange;
    giftSettingsToChange[field] = event.target.value;

    this.setState({
      giftSettingsToChange
    });
  };
  resetField = fieldName => {
    const giftSettingsToChange = this.state.giftSettingsToChange;
    giftSettingsToChange[fieldName] = this.props.gift[fieldName];
    this.setState({
      giftSettingsToChange
    });

    this.forceUpdate();
  };

  confirmSaveChanges = () => {
    var dialogTitle =
      this.props.gift.giftId === ""
        ? "新規ギフトを追加しますか？"
        : "変更を保存しますか？";
    this.setState({
      confirmDialogTitle: dialogTitle
    });
    if (this.props.gift.giftId === "") {
      this.handleConfirmDialogOpen(this.addNewGift);
    } else {
      this.handleConfirmDialogOpen(this.saveChanges);
    }
  };

  addNewGift = () => {
    var addGiftRequest = new addGift();

    var data = {
      inputPersonType: "user",
      inputPersonId: this.props.inputPersonId,
      inputPersonPassword: this.props.inputPersonPassword,
      giftId: this.props.gift.giftId
    };
    if (this.state.giftSettingsToChange.title !== this.props.gift.title) {
      data.title = this.state.giftSettingsToChange.title;
    }
    if (
      this.state.giftSettingsToChange.imgUrl !== this.props.gift.imgUrl ||
      this.state.giftSettingsToChange.imgUrl !==
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    ) {
      const canvas = this.avatarEditor.getImage();
      const dataUrl = canvas.toDataURL();
      data.imgUrl = dataUrl;
    }

    addGiftRequest.data = data;
    addGiftRequest.onSaccess = this.onGiftAdded;
    addGiftRequest.send();
  };

  onGiftAdded = res => {
    if (res.status === "success") {
      this.props.addGift(res.gift);
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
      confirmDialogErrorMessage: ""
    });
  };

  handleDrop = dropped => {
    var newGiftSettingsToChange = this.state.giftSettingsToChange;
    newGiftSettingsToChange.imgUrl = dropped[0];
    this.setState({ giftSettingsToChange: newGiftSettingsToChange });
  };

  handleAvatarScale = (event, value) => {
    this.setState({ avatarScale: value });
  };

  handleAvatarRotation = direction => {
    if (direction === "left") {
      const avatarRotation = this.state.avatarRotation - 45;
      this.setState({ avatarRotation: avatarRotation });
    } else if (direction === "right") {
      const avatarRotation = this.state.avatarRotation + 45;
      this.setState({ avatarRotation: avatarRotation });
    }
  };

  onInputChange = event => {
    const field = event.target.name;
    const giftSettingsToChange = this.state.giftSettingsToChange;
    giftSettingsToChange[field] = event.target.value;

    this.setState({
      giftSettingsToChange
    });
  };

  buttonDisabled = () => {
    var disabled = false;
    if (this.props.gift.giftId === "") {
      disabled =
        this.state.giftSettingsToChange.title === "" ||
        this.state.giftSettingsToChange.imgUrl === "";
    } else {
      disabled =
        this.state.giftSettingsToChange.title === this.props.gift.title &&
        this.state.giftSettingsToChange.imgUrl === this.props.gift.imgUrl;
    }
    return disabled;
  };

  render() {
    const confirmMessage = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <a style={{ color: "red" }}>{this.state.confirmDialogErrorMessage}</a>
      </div>
    );

    const actions = [
      <FlatButton
        label='キャンセル'
        primary={true}
        onClick={this.handleConfirmDialogClose}
      />,
      <FlatButton
        label='確認'
        primary={true}
        keyboardFocused={true}
        onClick={this.state.confirmDialogFunction}
      />
    ];

    return (
      <div>
        <Card className='CONTAINER'>
          <h2 className='CARD-HEADING'>ギフト設定</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
          >
            {this.props.gift.giftId !== ""}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <RaisedButton
              onClick={this.confirmSaveChanges}
              disabled={this.buttonDisabled()}
              backgroundColor={yellowA400}
              label='保存する'
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
            <TextField
              floatingLabelText='タイトル'
              floatingLabelFixed={true}
              underlineStyle={{
                borderColor: `${
                  this.state.giftSettingsToChange.title ===
                  this.props.gift.title
                    ? grey300
                    : yellowA400
                }`
              }}
              floatingLabelStyle={{
                color: `${
                  this.state.giftSettingsToChange.title ===
                  this.props.gift.title
                    ? grey300
                    : yellowA400
                }`
              }}
              floatingLabelFocusStyle={{ color: blue500 }}
              value={this.state.giftSettingsToChange.title}
              onChange={this.onInputChange}
              name='title'
            />
            <FlatButton
              onClick={() => {
                this.resetField("title");
              }}
              disabled={
                this.state.giftSettingsToChange.title === this.props.gift.title
              }
              label='リセット'
            />
          </div>
          {/*priceType*/}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            <DropZone
              onDrop={this.handleDrop}
              disableClick
              style={{ width: "350px", height: "350px" }}
            >
              <div id={this.props.gift.imgUrl}>
                <AvatarEditor
                  ref={this.setAvatarEditorRef}
                  image={this.state.giftSettingsToChange.imgUrl}
                  width={250}
                  height={250}
                  border={50}
                  rotate={this.state.avatarRotation}
                  color={[0, 204, 204, 0.6]} // RGBA
                  borderRadius={25}
                  scale={this.state.avatarScale}
                />
              </div>
            </DropZone>
            <div style={{ paddingLeft: "40px" }}>
              <FlatButton
                onClick={() => {
                  this.resetField("imgUrl");
                }}
                disabled={
                  this.state.giftSettingsToChange.imgUrl ===
                  this.props.gift.imgUrl
                }
                label='リセット'
              />
            </div>
          </div>
          <div style={{ padding: "10px" }}>
            <Label>ズーム</Label>
            <Slider
              min={0.2}
              max={5}
              step={0.01}
              value={this.state.avatarScale}
              onChange={this.handleAvatarScale}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <Label>回転</Label>
            <FlatButton
              onClick={() => {
                this.handleAvatarRotation("left");
              }}
              label='左'
            />
            <FlatButton
              onClick={() => {
                this.handleAvatarRotation("right");
              }}
              label='右'
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
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  withRouter(GiftSettingsComponent)
);
