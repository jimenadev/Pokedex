import { PokemonTypesDTO } from "./PokemonTypes.dto";

export interface PokemonDTO{
    id:number;
    name:string;
    number:string;
    url:string;
    urlImage:string;
    types:PokemonTypesDTO[];
}