import React from 'react';
import logo from "./statics/Pokedex-logo.svg"
import Header from './components/Header';
import Searcher from './components/Searcher';
import Filters from './components/Filters';

function App() {
  return (
    <div className="app">
      <Header>
        <div className="logo" >
            <img src={logo} alt="logo"/>
        </div>
       <Searcher />
       <Filters />
      </Header>
    </div>
  );
}

export default App;
