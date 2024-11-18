import { PokemonTypes } from "./PokemonTypes";

export interface PokemonState {
    isFetchingPokemons: boolean;
    error?: string | undefined; 
    pokemons: Pokemon[];
}


export interface RootState {
    pokemonReducer: PokemonState;
  }

export interface SuccessFetchingPokemonsPayload {
    data: Pokemon[];
}
  
export interface ErrorFetchingPokemonsPayload {
    error: string;
}
  
export interface Pokemon{
    id:number;
    name:string;
    number:string;
    url:string;
    urlImage:string;
    types?:PokemonTypes[];
}