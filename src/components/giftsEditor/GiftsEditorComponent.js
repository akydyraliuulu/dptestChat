import getAll from "../../utils/getAll";

import GiftSettingsPage from "./giftSettings/index";

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import PerfectScrollbar from "react-perfect-scrollbar";
import GiftsList from "./GiftsList";
import Button from "@material-ui/core/Button";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
    height: "calc(100vh - 150px)"
  },

  title: {
    margin: "2px",
    fontSize: 14
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 150px)",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  bootstrapRoot: {
    padding: 0,
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 12,
    padding: "5px 6px",
    width: "calc(100% - 12px)",
    height: "16px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "\"Segoe UI\"",
      "Roboto",
      "\"Helvetica Neue\"",
      "Arial",
      "sans-serif",
      "\"Apple Color Emoji\"",
      "\"Segoe UI Emoji\"",
      "\"Segoe UI Symbol\""
    ].join(","),
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.1rem rgba(0,123,255,.25)"
    }
  },
  bootstrapFormLabel: {
    fontSize: 18
  }
});

class ClippedDrawer extends React.Component {
  state = {
    selectedGiftId: "",
    gifts: [],
    categories: [],
    tags: [],
  };

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    var getAllRequest = new getAll();
    getAllRequest.data = {
      inputPersonType: "user",
      inputPersonId: this.props.inputPersonId,
      inputPersonPassword: this.props.inputPersonPassword
    };

    getAllRequest.onSaccess = this.onGetAll;
    getAllRequest.send();
  };

  onGetAll = res => {
    if (res.status === "success") {
      this.setState({
        gifts: res.gifts
      });
    }
    // eslint-disable-next-line no-empty
    if (res.status === "error") {}
  };

  selectGift = index => {
    this.setState({
      selectedGiftId: index
    });
  };

  addGift = giftNewData => {
    var newGifts = this.state.gifts;
    newGifts.push(giftNewData);

    this.setState({
      gifts: newGifts
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Drawer
          variant='permanent'
          classes={{
            paper: classes.drawerPaper
          }}
          anchor='left'
        >
          <Button
            color='primary'
            onClick={this.addNewGift}
            className={classes.button}
          >
            ギフト追加
          </Button>
          <PerfectScrollbar>
            <GiftsList gifts={this.state.gifts} selectGift={this.selectGift} />
          </PerfectScrollbar>
        </Drawer>
        <main className={classes.content}>
          <PerfectScrollbar>
            {this.state.selectedGiftId !== "" && (
              <GiftSettingsPage
                gift={this.state.gift}
                addGift={this.addGift}
                inputPersonId={this.props.inputPersonId}
                inputPersonPassword={this.props.inputPersonPassword}
              />
            )}
          </PerfectScrollbar>
        </main>
        <Drawer
          variant='permanent'
          classes={{
            paper: classes.drawerPaper
          }}
          anchor='right'
        />
      </div>
    );
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClippedDrawer);
