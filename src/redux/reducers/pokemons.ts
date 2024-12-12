import { createReducer } from "@reduxjs/toolkit";
import { PokemonState } from "../types/Pokemon";


import { 
    startFetchingPokemons,
    errorFetchingPokemons,
    successFetchingPokemons,
    successSearchPokemons,
    successFetchingPokemonsDisplay
  } from "../actions/pokemons";

 import { 
  changePagePokemon,
  errorChangePagePokemon,
 } from "../actions/pager"

 import { 
  startActivePokemon,
  successActivePokemon,
  errorActivePokemon
 } from "../actions/activatePokemon"



  const initialState: PokemonState = {
    isFetchingPokemons: false,
    error: undefined,
    pokemons: [],
    pokemonsDisplay:[],
    totalPokemon:700,
    limit:70,
    offset:0,
    totalPage:10,
    currentPage:1,
    search:"",
    filters:[],
    isActivePokemon:false,
    activePokemon:[]
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
        pokemonsDisplay: [],
        error: action.payload.error,
      }
    })
    .addCase(successFetchingPokemonsDisplay, (state, action) => {
      return {
        ...state,
        isFetchingPokemons: false,
        offset: action.payload.offset,
        currentPage: action.payload.currentPage,
        totalPage: action.payload.totalPage,
        pokemonsDisplay: action.payload.dataDisplay,
      }
    })
    .addCase(changePagePokemon, (state, action) => {
      return {
        ...state,
        isFetchingPokemons: true,
        pokemonsDisplay: [],
        offset: action.payload.offset,
        currentPage: action.payload.currentPage,
      }
    })
    .addCase(errorChangePagePokemon, (state, action) => {
      return {
        ...state,
        isFetchingPokemons: false,
        pokemonsDisplay: [],
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
    .addCase(startActivePokemon, (state, action) => {
      return {
        ...state,
        isActivePokemon: true,
        activePokemon:[]
      }
    })
    .addCase(successActivePokemon, (state, action) => {
      return {
        ...state,
        isActivePokemon: action.payload.isActivePokemon,
        activePokemon: action.payload.data
      }
    })
    .addCase(errorActivePokemon, (state, action) => {
      return {
        ...state,
        isActivePokemon: false,
        activePokemon:[]
      }
    })
    .addDefaultCase((state, action) => {
      return state;
    });
  });

  export default pokemonReducer;