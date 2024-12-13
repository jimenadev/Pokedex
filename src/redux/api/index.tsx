import axios from "axios";

export const apiCall = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});


export const dataTypesPokemon = async (url:string) => {
  return await axios.get(url)
    .then(res => res.data.types)
}

export const getPokemonExtraData = async (id:number) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const pokemon = response.data;

  return pokemon
}

export const getPokemonSpeciesData = async (id:number) => {
  const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const species = speciesResponse.data;

  return species
}

export const getPokemonEvolutionsData = async (url:string) => {
  const evolutionResponse = await axios.get(url);
  const evolution = evolutionResponse.data;

  return evolution
}