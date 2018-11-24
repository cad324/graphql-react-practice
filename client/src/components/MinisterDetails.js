import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getMinisterQuery} from '../queries/queries';

class MinisterDetails extends Component {
  displayMinisterDetails() {
    const {minister} = this.props.data;
    if (minister) {
      return(
        <div>
          <h2>{minister.name}</h2>
          <p>Position: {minister.title}</p>
          <h3>Minister Bio</h3>
          <p>{minister.bio}</p>
        </div>
      )
    } else {
      return (
        <div>No minister selected</div>
      )
    }
  }
  render() {
    console.log(this.props);
    return (
      <div id="book-details">
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
