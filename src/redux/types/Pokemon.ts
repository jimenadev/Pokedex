import { PokemonTypes } from "./PokemonTypes";

export interface PokemonState {
    isFetchingPokemons: boolean;
    error?: string | undefined; 
    pokemons: Pokemon[];
    pokemonsDisplay:  Pokemon[];
    totalPokemon:number,
    limit:number;
    offset:number;
    totalPage:number;
    currentPage:number;
    search:string;
}


export interface RootState {
    pokemonReducer: PokemonState;
  }
  
export interface ErrorFetchingPokemonsPayload {
    error: string;
}

export interface  SuccessFetchingPokemonsPayload{
    data: Pokemon[];
}

export interface SuccessFetchingPokemonsDisplayPayload{
    offset:number;
    totalPage:number;
    currentPage:number;
    dataDisplay: Pokemon[];
}

export interface SuccessSearchPokemonsPayload {
    offset:number;
    totalPage:number;
    currentPage:number;
    data?: Pokemon[] | undefined;
    dataDisplay?: Pokemon[] | undefined;
    
}

export interface ChangePagePokemonsPayload {
    offset:number,
    currentPage:number,
    typeAction?:string | undefined,
}
  
export interface Pokemon{
    id:number;
    name:string;
    number:string;
    url:string;
    urlImage:string;
    types?:PokemonTypes[];
}