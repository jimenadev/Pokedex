import { createAction } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { ErrorActivePokemonPayload, Pokemon, SuccessActivePokemonPayload } from "../types/Pokemon";


export const startActivePokemon = createAction("START_ACTIVE_POKEMON");
export const errorActivePokemon = createAction<ErrorActivePokemonPayload>("ERROR_ACTIVE_POKEMON");
export const successActivePokemon = createAction<SuccessActivePokemonPayload>("SUCCESS_ACTIVE_POKEMON");


export const showFeaturesPokemon = (
    pokemons:Pokemon[],
    pokemonId:number,
):  AppThunk  => async (dispatch) => {
    try {
        dispatch(startActivePokemon());
        
        const data: Pokemon[] = pokemons.filter(
            (pokemon: Pokemon) => pokemon.id === pokemonId
          );

        dispatch(successActivePokemon({data,  isActivePokemon:false}))
      
    } catch (error: any) {
        dispatch(errorActivePokemon(error));
    }
  } 

