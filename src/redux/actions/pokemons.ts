import { createAction } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { apiCall, dataTypesPokemon } from "../api";
import { ErrorFetchingPokemonsPayload, Pokemon, SuccessFetchingPokemonsPayload, SuccessSearchPokemonsPayload } from "../types/Pokemon";
import { PokemonUtils } from "../utils/PokemonUtils";
import { PokemonTypes } from "../types/PokemonTypes";

export const startFetchingPokemons = createAction("START_FETCHING_POKEMONS");
export const errorFetchingPokemons = createAction<ErrorFetchingPokemonsPayload>("ERROR_FETCHING_POKEMONS");
export const successFetchingPokemons = createAction<SuccessFetchingPokemonsPayload>("SUCCESS_FETCHING_POKEMONS");
export const successSearchPokemons = createAction<SuccessSearchPokemonsPayload>("SUCCESS_SEARCH_POKEMONS");


export const fetchPokemons = (
    limit:number, 
    offset:number,
    search:string,
):  AppThunk  => async (dispatch) => {
    try {
      dispatch(startFetchingPokemons());

      if(search){
        limit=168
      }

      const dataPoke  = await apiCall.get( `/pokemon?limit=${limit}&offset=${offset}`);
      const pokemonsTransform:Pokemon[] = PokemonUtils.getPokemonsTransform(dataPoke.data.results, offset);
      
      let data: Pokemon[] =  await Promise.all(
        pokemonsTransform.map(async (pokemon: Pokemon) => {
          let typesData = await dataTypesPokemon(pokemon.url)
          let types: PokemonTypes[] = await PokemonUtils.getPokemonsTypeTransform(typesData);
          return { ...pokemon, types };
        })
      );

      if(search){
        let pokemons: Pokemon[] = [];
        let searchSplit: string[] = search.toLowerCase().split(" ")

        pokemons = data
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

        dispatch(successSearchPokemons({offset, totalPage, currentPage,  data:pokemons}))
      }else{
        dispatch(successFetchingPokemons({data}));
      }
      
      
    } catch (error: any) {
      dispatch(errorFetchingPokemons(error));
    }
  } 



