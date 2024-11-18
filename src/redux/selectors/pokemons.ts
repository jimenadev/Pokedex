import { RootState } from "../store";
import { Pokemon } from "../types/Pokemon";

export const isFetchingPokemonsSel = (state: RootState): boolean  => state.pokemonReducer.isFetchingPokemons;
export const pokemonsErrSel = (state: RootState): string | undefined => state.pokemonReducer.error;
export const pokemonsSel = (state: RootState): Pokemon[] => state.pokemonReducer.pokemons;
export const limitSel =  (state: RootState): number => state.pokemonReducer.limit;
export const offsetSel =  (state: RootState): number => state.pokemonReducer.offset;
export const totalPageSel =  (state: RootState): number => state.pokemonReducer.totalPage;
export const currentPageSel =  (state: RootState): number => state.pokemonReducer.currentPage;