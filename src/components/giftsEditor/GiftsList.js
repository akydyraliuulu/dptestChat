import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  root: {
    width: "100%",

    maxWidth: 360,
    left: 0,
    backgroundColor: theme.palette.background.paper
  }
});

class GiftsList extends React.Component {
  state = {
    checked: [1]
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.props.gifts.map(gift => (
            <ListItem
              key={gift.giftId}
              dense
              button
              className={classes.listItem}
              onClick={() => {
                this.props.selectGift(gift.giftId);
              }}
            >
              <Avatar
                style={{ borderRadius: "10%" }}
                alt="img"
                src={gift.imgUrl}
              />
              <ListItemText primary={gift.title} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(GiftsList);
