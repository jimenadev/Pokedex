import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch } from './redux/store';
import { isFetchingPokemonsSel, pokemonsErrSel, pokemonsSel } from "./redux/selectors/pokemons"
import { fetchPokemons } from "./redux/actions/pokemons"; 
import logo from "./statics/Pokedex-logo.svg"
import Header from './components/Header';
import Searcher from './components/Searcher';
import Order from './components/Order';
import FilterByType from './components/FilterByType';
import CardPokemon from './components/CardPokemon';
import CardList from './components/CardList';
import { Pokemon } from './redux/types/Pokemon';

function App() {

  const dispatch: AppDispatch = useDispatch(); 
  const isFetchingPokemons = useSelector(isFetchingPokemonsSel, shallowEqual)
  const pokemons = useSelector(pokemonsSel, shallowEqual)
  const pokemonsErr = useSelector(pokemonsErrSel, shallowEqual)

  useEffect(() => {
    const limit = 21;
    const offset = 0
    dispatch(fetchPokemons(limit, offset));    
  }, []);


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
      <CardList>
      {pokemons.map((pokemon: Pokemon) => (
        <CardPokemon
          key={pokemon.id}
          pokemon={pokemon} 
        />
      ))}
      </CardList>
    </div>
  );
}

export default App;
