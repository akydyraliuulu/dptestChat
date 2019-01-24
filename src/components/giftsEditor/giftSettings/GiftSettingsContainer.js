import { connect } from "react-redux";
import GiftSettingsComponent from "./GiftSettingsComponent";

const mapStateToProps = (state, ownProps) => {
  // var giftTags = ownProps.gift.tags.map(tag => ({_id:tag._id, title:tag.title}))
  var gift = ownProps.gift;
  // gift.tags = giftTags;

  return {
    inputPersonId: ownProps.inputPersonId,
    inputPersonPassword: ownProps.inputPersonPassword,
    gift: gift,
    // tags:ownProps.tags,
    // categories:ownProps.categories,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addGift: gift => {
      ownProps.addGift(gift);
    }
  };
};

const GiftSettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftSettingsComponent);

export default GiftSettingsContainer;
