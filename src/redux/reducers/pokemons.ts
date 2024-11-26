import { createReducer } from "@reduxjs/toolkit";
import { PokemonState } from "../types/Pokemon";


import { 
    startFetchingPokemons,
    errorFetchingPokemons,
    successFetchingPokemons,
    successSearchPokemons
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
    currentPage:1,
    search:""
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
    .addCase(successSearchPokemons, (state, action) => {
      return {
        ...state,
        isFetchingPokemons: false,
        offset:action.payload.offset,
        totalPage:action.payload.totalPage,
        currentPage: action.payload.currentPage,
        pokemons: action.payload.data ?? [] ,
      }
    })
    .addDefaultCase((state, action) => {
      return state;
    });
  });


  export default pokemonReducer;