import { createAction } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { apiCall, dataTypesPokemon } from "../api";
import { ErrorFetchingPokemonsPayload, Pokemon, SuccessFetchingPokemonsDisplayPayload, SuccessFetchingPokemonsPayload, SuccessSearchPokemonsPayload } from "../types/Pokemon";
import { PokemonUtils } from "../utils/PokemonUtils";
import { PokemonTypes } from "../types/PokemonTypes";

export const startFetchingPokemons = createAction("START_FETCHING_POKEMONS");
export const errorFetchingPokemons = createAction<ErrorFetchingPokemonsPayload>("ERROR_FETCHING_POKEMONS");
export const successFetchingPokemons = createAction<SuccessFetchingPokemonsPayload>("SUCCESS_FETCHING_POKEMONS");
export const successFetchingPokemonsDisplay = createAction<SuccessFetchingPokemonsDisplayPayload>("SUCCESS_FETCHING_POKEMONS_DISPLAY");
export const successSearchPokemons = createAction<SuccessSearchPokemonsPayload>("SUCCESS_SEARCH_POKEMONS");


export const fetchPokemons = (
    totalPokemons:number,
):  AppThunk  => async (dispatch) => {
    try {
      dispatch(startFetchingPokemons());
      const dataPoke  = await apiCall.get( `/pokemon?limit=${totalPokemons}`);
      const pokemonsTransform:Pokemon[] = PokemonUtils.getPokemonsTransform(dataPoke.data.results);
      
      let data: Pokemon[] =  await Promise.all(
        pokemonsTransform.map(async (pokemon: Pokemon) => {
          let typesData = await dataTypesPokemon(pokemon.url)
          let types: PokemonTypes[] = await PokemonUtils.getPokemonsTypeTransform(typesData);
          return { ...pokemon, types };
        })
      );

      dispatch(successFetchingPokemons({data}))
      
    } catch (error: any) {
      dispatch(errorFetchingPokemons(error));
    }
  } 


  export const pokemonPerPage = (
    pokemons:Pokemon[],
    limit:number, 
    offset:number,
    totalPage:number, 
    currentPage:number,
    search:string,
):  AppThunk  => async (dispatch) => {
    try {
      dispatch(startFetchingPokemons());

      if(search){
        let pokemonsSearch: Pokemon[] = [];
        let searchSplit: string[] = search.toLowerCase().split(" ")

        pokemonsSearch = pokemons
          .filter((pokemon: Pokemon) =>
            searchSplit.includes(pokemon.name.toLowerCase()) ||
            searchSplit.includes(pokemon.number.toLowerCase()) ||
            pokemon.types?.some((t) => searchSplit.includes(t.type) ) 
          )
          .map((pokemon: Pokemon) => ({
            ...pokemon,
          }));

        const offset:number = 0;
        const totalPage:number =1;
        const currentPage:number = 1; 

        dispatch(successFetchingPokemonsDisplay({offset, totalPage, currentPage, dataDisplay:pokemonsSearch}))

      }else{

        const dataDisplay: Pokemon[]  = pokemons.slice(offset, offset + limit)

        dispatch(successFetchingPokemonsDisplay({offset, totalPage, currentPage, dataDisplay}))

      }
      
      
      
    } catch (error: any) {
      dispatch(errorFetchingPokemons(error));
    }
  } 



