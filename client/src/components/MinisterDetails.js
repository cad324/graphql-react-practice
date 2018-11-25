import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getMinisterQuery} from '../queries/queries';

class MinisterDetails extends Component {
  displayMinisterDetails() {
    const {minister} = this.props.data;
    console.log(this.props.data.minister);
    if (minister) {
      console.log("Enters minister condition");
      return(
        <div>
          <h2>{minister.name}</h2>
          <p>Position: {minister.title}</p>
          <h3>Minister Bio</h3>
          <p>{minister.bio}</p>
        </div>
      )
    } else {
      console.log("Does not enters minister condition");
      return (
        <div>No minister selected</div>
      )
    }
  }
  render() {
    return (
      <div id="minister-details">
        {this.displayMinisterDetails()}
      </div>
    );
  }
}

export default graphql(getMinisterQuery, {
  options: (props) => {
    return {
      variables: {
        id:props.ministerId
      }
    }
  }
})(MinisterDetails);
