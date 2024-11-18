import { createAction } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { apiCall, dataTypesPokemon } from "../api";
import { ErrorFetchingPokemonsPayload, Pokemon, SuccessFetchingPokemonsPayload } from "../types/Pokemon";
import { PokemonUtils } from "../utils/PokemonUtils";
import { PokemonTypes } from "../types/PokemonTypes";

export const startFetchingPokemons = createAction("START_FETCHING_POKEMONS");
export const errorFetchingPokemons = createAction<ErrorFetchingPokemonsPayload>("ERROR_FETCHING_POKEMONS");
export const successFetchingPokemons = createAction<SuccessFetchingPokemonsPayload>("SUCCESS_FETCHING_POKEMONS");

export const fetchPokemons = (
    limit:number, 
    offset:number
):  AppThunk  => async (dispatch) => {
    try {
      dispatch(startFetchingPokemons());

      const dataPoke  = await apiCall.get( `/pokemon?limit=${limit}&offset=${offset}`);
      const pokemonsTransform:Pokemon[] = PokemonUtils.getPokemonsTransform(dataPoke.data.results, offset);
      
      const data: Pokemon[] =  await Promise.all(
        pokemonsTransform.map(async (pokemon: Pokemon) => {
          let typesData = await dataTypesPokemon(pokemon.url)
          let types: PokemonTypes[] = await PokemonUtils.getPokemonsTypeTransform(typesData);
          return { ...pokemon, types };
        })
      );
      
      dispatch(successFetchingPokemons({data}));
    } catch (error: any) {
      dispatch(errorFetchingPokemons(error));
    }
  } 



