import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getMinistersQuery} from '../queries/queries';

import MinisterDetails from './MinisterDetails';

class MinisterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  displayMinisters() {
    var data = this.props.data;
    if (data.loading) {
      return(<div>Loading...</div>);
    } else {
      return data.ministers.map(minister => {
        return(
          <li key={minister.id} onClick={(e) => {this.setState({selected: minister.id})}}>{minister.name}</li>
        );
      })
    }
  }
  render() {
    return (
      <div>
        <ul id="minister-list">
          {this.displayMinisters()}
        </ul>
        <MinisterDetails ministerId={this.state.selected}/>
      </div>
    )
  }
}

export default graphql(getMinistersQuery)(MinisterList);
