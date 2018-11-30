import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Grid } from "semantic-ui-react";


class Main extends Component {
  logoutRequest = () => {
    console.log("logout");
  };

  render() {
    const user = this.props;
    const names = ['beka', 'andrei', 'aibek', 'hasan', 'adilet'];
    const listItems = names.map((name) => 
   <button class="item button"> {name} </button>);

    return (
      <Container className="main" style={{ textalign: "right" }}>
        <Grid textalign="right" style={{ marginTop: 60 }}>
          <Grid.Column textalign="right" width={16}>
            <button
              class="ui right floated right labeled icon button"
              onClick={() => this.logoutRequest()}
            >
              <i class="right arrow icon" />
              LOGOUT
            </button>
          </Grid.Column>
        </Grid>
        <Grid style={{ marginTop: 20 }}>
          <Grid.Column textalign="right" width={16}>
            <button class="ui left floated button">ONLINE:</button>
            <div class="ui left floated horizontal list"
            style={{ padding: 5 }}>
            { listItems }
            </div>
            
          </Grid.Column>
        </Grid>
        <Grid style={{ marginTop: 20 }}>
          <Grid.Column textalign="right" width={16}>
           
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(Main));
