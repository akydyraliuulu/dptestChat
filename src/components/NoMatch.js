import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class NoMatch extends Component {

  render() {

    return(
      <div className='nomatch'>
        <span>NoMatch</span>
      </div>
    )
  }
}

function mapStateToProps ( {user} ) {
  return {
    user
  }
}

export default withRouter( connect( mapStateToProps )(NoMatch) )
