import React, { Component } from "react";
import GiftSettingsContainer from "./GiftSettingsContainer";

class GiftSettingsPage extends Component {
  render() {
    return (
      <div className='CONTAINER'>
        <GiftSettingsContainer
          gift={this.props.gift}
          addGift={this.props.addGift}
          inputPersonId={this.props.inputPersonId}
          inputPersonPassword={this.props.inputPersonPassword}
        />
      </div>
    );
  }
}

export default GiftSettingsPage;
