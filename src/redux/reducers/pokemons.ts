import { createReducer } from "@reduxjs/toolkit";
import { PokemonState } from "../types/Pokemon";


import { 
    startFetchingPokemons,
    errorFetchingPokemons,
    successFetchingPokemons,
  } from "../actions/pokemons";

 import { 
  changePagePokemon,
  errorChangePagePokemon,
 } from "../actions/pager"

  const initialState: PokemonState = {
    isFetchingPokemons: false,
    error: undefined,
    pokemons: [],
    limit:21,
    offset:0,
    totalPage:8,
    currentPage:1
  };

  const pokemonReducer = createReducer(initialState, (builder) => {
    builder.addCase(startFetchingPokemons, (state) => {
      return {
        ...state,
        isFetchingPokemons: true,
      };
    })
    .addCase(successFetchingPokemons, (state, action) => {
      return {
        ...state,
        isFetchingPokemons: false,
        pokemons: action.payload.data,
      }
    })
    .addCase(errorFetchingPokemons, (state, action) => {
      return {
        ...state,
        isFetchingPokemons: false,
        pokemons: [],
        error: action.payload.error,
      }
    })
    .addCase(changePagePokemon, (state, action) => {
      return {
        ...state,
        isFetchingPokemons: true,
        pokemons: [],
        offset: action.payload.offset,
        currentPage: action.payload.currentPage,
      }
    })
    .addCase(errorChangePagePokemon, (state, action) => {
      return {
        ...state,
        isFetchingPokemons: false,
        pokemons: [],
        error: action.payload.error,
      }
    })
    .addDefaultCase((state, action) => {
      return state;
    });
  });


  export default pokemonReducer;