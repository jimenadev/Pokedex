import { createAction } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { getPokemonExtraData, getPokemonSpeciesData } from "../api";
import { ErrorActivePokemonPayload, ExtraAboutPokemon, ExtraBaseStatsPokemon, Pokemon, SuccessActivePokemonPayload } from "../types/Pokemon";


export const startActivePokemon = createAction("START_ACTIVE_POKEMON");
export const errorActivePokemon = createAction<ErrorActivePokemonPayload>("ERROR_ACTIVE_POKEMON");
export const successActivePokemon = createAction<SuccessActivePokemonPayload>("SUCCESS_ACTIVE_POKEMON");


export const showFeaturesPokemon = (
    pokemons:Pokemon[],
    pokemonId:number,
):  AppThunk  => async (dispatch) => {
    try {
        dispatch(startActivePokemon());

        let data: Pokemon[] =[]
        let extraAbout!:ExtraAboutPokemon
        let extraBaseStats!:ExtraBaseStatsPokemon[]
        
        if(pokemonId !== 0){

                data = pokemons.filter(
                    (pokemon: Pokemon) => pokemon.id === pokemonId
                );
                
                let extra = await getPokemonExtraData(pokemonId)
                let extraEspecies = await getPokemonSpeciesData(pokemonId)

                extraAbout = {
                    habitat:extraEspecies.habitat.name,
                    height:extra.height,
                    weight:extra.weight,
                    abilities:extra.abilities.map((ability: { ability: { name: any; }; }) => ability.ability.name).join(", "),
                }

                extraBaseStats = extra.stats.map((stat: { stat: { name: any; }; base_stat: any; }) => ({
                    name: stat.stat.name, // Nombre del atributo (ej. speed)
                    value: stat.base_stat, // Valor base
                }))
            
              dispatch(successActivePokemon({isActivePokemon:false, data, extraAbout, extraBaseStats}))

        }
      
    } catch (error: any) {
        dispatch(errorActivePokemon(error));
    }
  } 

