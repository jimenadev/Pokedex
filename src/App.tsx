import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch } from './redux/store';
import { currentPageSel, isFetchingPokemonsSel, limitSel, offsetSel, pokemonsErrSel, pokemonsSel, totalPageSel } from "./redux/selectors/pokemons"
import { fetchPokemons } from "./redux/actions/pokemons"; 
import logo from "./statics/Pokedex-logo.svg"
import Header from './components/Header';
import Searcher from './components/Searcher';
import Order from './components/Order';
import FilterByType from './components/FilterByType';
import CardPokemon from './components/CardPokemon';
import CardList from './components/CardList';
import { Pokemon } from './redux/types/Pokemon';
import CardListLoading from './components/CardListLoading';
import CardPokemonLoading from './components/CardPokemonLoading';
import Error from './components/Error';
import Pager from './components/Pager';
import Page from './components/Page';

function App() {

  const dispatch: AppDispatch = useDispatch(); 
  const isFetchingPokemons = useSelector(isFetchingPokemonsSel, shallowEqual)
  const pokemons = useSelector(pokemonsSel, shallowEqual)
  const pokemonsErr = useSelector(pokemonsErrSel, shallowEqual)
  const limit = useSelector(limitSel, shallowEqual)
  const offset = useSelector(offsetSel, shallowEqual)
  const totalPage = useSelector(totalPageSel, shallowEqual)
  const currentPage = useSelector(currentPageSel, shallowEqual)

  useEffect(() => {
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

      {isFetchingPokemons && <CardListLoading>
        <CardPokemonLoading/>
        <CardPokemonLoading/>
        <CardPokemonLoading/>
      </CardListLoading>}

      { (pokemonsErr || pokemons.length === 0) && <Error />}

      {!isFetchingPokemons && !pokemonsErr && pokemons.length > 0 && 
       <CardList>
       {pokemons.map((pokemon: Pokemon) => (
         <CardPokemon
           key={pokemon.id}
           pokemon={pokemon} 
         />
       ))}
       </CardList>
      }

    <Pager>
    {!isFetchingPokemons && !pokemonsErr && pokemons.length > 0 && 
         Array.from({ length: totalPage }).map((_, index) => (
          <Page key={index} pageNumber={index + 1} selected={(currentPage === (index + 1) ) ? true : false} />
        ))
      }
    </Pager>
    </div>
  );
}

export default App;
