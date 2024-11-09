import axios from "axios";
import { PokemonTypesDTO } from "../DTO/PokemonTypes.dto";

export const getPokemons = (limit:number, offset:number) => {
    return axios.get( `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            .then(res => res.data.results)
            .catch(err => console.log(err))
}

export const dataPokemon = async (url:string): Promise<PokemonTypesDTO[]> => {
  return  axios.get(url)
    .then((response) => {
      const types: PokemonTypesDTO[] = response.data.types.map((typeInfo: any) => ({
        type: typeInfo.type.name,
        name: typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1).toLowerCase(),
        typeImg: `/icon/${typeInfo.type.name}.svg`,
        classPokemonType: `pokemon-type pokemonType-${typeInfo.type.name}`
      }));
      return types;
    });
}



