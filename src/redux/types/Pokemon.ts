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
    filters:string[];
    isActivePokemon:boolean;
    activePokemon:Pokemon[];
    extraAbout?:ExtraAboutPokemon;
    extraBaseStats?:ExtraBaseStatsPokemon[];
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

export interface SuccessActivePokemonPayload{
    isActivePokemon:boolean;
    data: Pokemon[] | [];
    extraAbout:ExtraAboutPokemon;
    extraBaseStats:ExtraBaseStatsPokemon[];
}

export interface ErrorActivePokemonPayload{
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

export interface ExtraAboutPokemon{
    habitat:string;
    height:number;
    weight:number;
    abilities:string;
}


export interface ExtraBaseStatsPokemon{
    name:string;
    value:string;
}



        