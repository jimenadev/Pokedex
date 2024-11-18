import axios from "axios";

export const apiCall = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});


export const dataTypesPokemon = async (url:string) => {
  return await axios.get(url)
    .then(res => res.data.types)
}