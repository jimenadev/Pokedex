import { RootState } from "../store";
import { Pokemon } from "../types/Pokemon";

export const isFetchingPokemonsSel = (state: RootState): boolean  => state.pokemonReducer.isFetchingPokemons;
export const pokemonsErrSel = (state: RootState): string | undefined => state.pokemonReducer.error;
export const pokemonsSel = (state: RootState): Pokemon[] => state.pokemonReducer.pokemons;