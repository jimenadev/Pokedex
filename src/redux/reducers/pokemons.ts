import { createReducer } from "@reduxjs/toolkit";
import { PokemonState } from "../types/Pokemon";


import { 
    startFetchingPokemons,
    errorFetchingPokemons,
    successFetchingPokemons
  } from "../actions/pokemons";

  const initialState: PokemonState = {
    isFetchingPokemons: false,
    error: undefined,
    pokemons: [],
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
    .addDefaultCase((state, action) => {
      return state;
    });
  });


  export default pokemonReducer;