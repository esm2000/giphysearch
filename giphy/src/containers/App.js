import React, { Component } from 'react';
import SearchField from '../components/SearchField'
import GifCard from '../components/GifCard'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <h1>Giphy Search Engine</h1>
        <SearchField id="searchField"/>
      </div>
    );
  }
  
}

export default App;
