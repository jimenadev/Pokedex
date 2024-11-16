import axios from "axios";

const apiCall = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

export default apiCall;