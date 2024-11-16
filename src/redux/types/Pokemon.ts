import { PokemonTypes } from "./PokemonTypes";

export interface PokemonState {
    isFetchingPokemons: boolean;
    error?: string; 
    pokemons: Pokemon[];
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