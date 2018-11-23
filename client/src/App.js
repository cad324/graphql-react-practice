import React, { Component } from 'react';
import BookList from './components/Booklist';

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Clive's Reading List</h1>
        <BookList/>
      </div>
    );
  }
}

export default App;
