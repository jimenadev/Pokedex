import React from 'react';
import logo from "./statics/Pokedex-logo.svg"
import Header from './components/Header';
import Searcher from './components/Searcher';
import Order from './components/Order';
import FilterByType from './components/FilterByType';

function App() {
  return (
    <div className="app">
      <Header>
        <div className="logo" >
            <img src={logo} alt="logo"/>
        </div>
       <Searcher />
       <div className="filters">
          <div className="orderPokemon">
            <Order />
          </div>
          <div className="filtersPokemonType">
            <FilterByType />   
          </div>
        </div>
      </Header>
    </div>
  );
}

export default App;
