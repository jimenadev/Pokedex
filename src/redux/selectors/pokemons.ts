import { RootState } from "../store";
import { ExtraAboutPokemon, ExtraBaseStatsPokemon, Pokemon } from "../types/Pokemon";

export const isFetchingPokemonsSel = (state: RootState): boolean  => state.pokemonReducer.isFetchingPokemons;
export const pokemonsErrSel = (state: RootState): string | undefined => state.pokemonReducer.error;
export const pokemonsSel = (state: RootState): Pokemon[] => state.pokemonReducer.pokemons;
export const pokemonsDisplaySel = (state: RootState): Pokemon[] => state.pokemonReducer.pokemonsDisplay;
export const totalPokemonsSel = (state: RootState): number => state.pokemonReducer.totalPokemon;
export const limitSel =  (state: RootState): number => state.pokemonReducer.limit;
export const offsetSel =  (state: RootState): number => state.pokemonReducer.offset;
export const totalPageSel =  (state: RootState): number => state.pokemonReducer.totalPage;
export const currentPageSel =  (state: RootState): number => state.pokemonReducer.currentPage;
export const isActivePokemonSel =  (state: RootState): boolean => state.pokemonReducer.isActivePokemon;
export const activePokemonSel =  (state: RootState): Pokemon[] => state.pokemonReducer.activePokemon;
export const extraAboutSel =  (state: RootState): ExtraAboutPokemon | undefined => state.pokemonReducer.extraAbout;
export const extraBaseStatsSel =  (state: RootState): ExtraBaseStatsPokemon[] | undefined => state.pokemonReducer.extraBaseStats;






