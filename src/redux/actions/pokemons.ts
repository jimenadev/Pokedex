import { createAction } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { apiCall, dataTypesPokemon } from "../api";
import { ErrorFetchingPokemonsPayload, Pokemon, SuccessFetchingPokemonsDisplayPayload, SuccessFetchingPokemonsPayload, SuccessSearchPokemonsPayload } from "../types/Pokemon";
import { PokemonUtils } from "../utils/PokemonUtils";
import { PokemonTypes } from "../types/PokemonTypes";
import { Sort } from "../types/sort.enum";

export const startFetchingPokemons = createAction("START_FETCHING_POKEMONS");
export const errorFetchingPokemons = createAction<ErrorFetchingPokemonsPayload>("ERROR_FETCHING_POKEMONS");
export const successFetchingPokemons = createAction<SuccessFetchingPokemonsPayload>("SUCCESS_FETCHING_POKEMONS");
export const successFetchingPokemonsDisplay = createAction<SuccessFetchingPokemonsDisplayPayload>("SUCCESS_FETCHING_POKEMONS_DISPLAY");
export const successSearchPokemons = createAction<SuccessSearchPokemonsPayload>("SUCCESS_SEARCH_POKEMONS");


export const fetchPokemons = (
    totalPokemons:number,
):  AppThunk  => async (dispatch) => {
    try {
      dispatch(startFetchingPokemons());
      const dataPoke  = await apiCall.get( `/pokemon?limit=${totalPokemons}`);
      const pokemonsTransform:Pokemon[] = PokemonUtils.getPokemonsTransform(dataPoke.data.results);
      
      let data: Pokemon[] =  await Promise.all(
        pokemonsTransform.map(async (pokemon: Pokemon) => {
          let typesData = await dataTypesPokemon(pokemon.url)
          let types: PokemonTypes[] = await PokemonUtils.getPokemonsTypeTransform(typesData);
          return { ...pokemon, types };
        })
      );

      dispatch(successFetchingPokemons({data}))
      
    } catch (error: any) {
      dispatch(errorFetchingPokemons(error));
    }
  } 


  export const pokemonPerPage = (
    totalPokemons:number,
    pokemons:Pokemon[],
    limit:number, 
    offset:number,
    totalPage:number, 
    currentPage:number,
    search:string,
    order:Sort,
    filters:string[],
):  AppThunk  => async (dispatch) => {
    try {
      dispatch(startFetchingPokemons());
      let dataDisplay: Pokemon[] = [];

      if(search){
        let searchSplit: string[] = search.toLowerCase().split(" ")

        dataDisplay = pokemons
          .filter((pokemon: Pokemon) =>
            searchSplit.includes(pokemon.name.toLowerCase()) ||
            searchSplit.includes(pokemon.number.toLowerCase()) ||
            pokemon.types?.some((t) => searchSplit.includes(t.type) ) 
          )
          .map((pokemon: Pokemon) => ({
            ...pokemon,
          }));

        offset = 0;
        totalPage = 1;
        currentPage = 1; 

        if(order === Sort.HighestNumberFirst){
          dataDisplay.reverse()
        }else if(order !== Sort.LowestNumberFirst){
          dataDisplay = sort(dataDisplay, order, totalPokemons, offset, limit )
        }

      }else if(filters.length>0){
        const filtersFormatted= filters.map((item) => item.toLowerCase()) 
    
        dataDisplay = pokemons
                          .filter((p: Pokemon) => p.types?.some((t) => filtersFormatted.includes(t.type)))
                          .map((pokemon: Pokemon) => ({
                                  ...pokemon,
                          }));

        offset = 0;
        totalPage = 1;
        currentPage = 1; 
                  

        if(order === Sort.HighestNumberFirst){
          dataDisplay.reverse()
        }else if(order !== Sort.LowestNumberFirst){
          dataDisplay = sort(dataDisplay, order, totalPokemons, offset, limit )
        }
    
      }else{

        totalPage=10;
        if(order !== Sort.LowestNumberFirst){
          dataDisplay = sort(pokemons, order, totalPokemons, offset, limit )
        }else{
          dataDisplay  = pokemons.slice(offset, offset + limit)
        }
      }

      dispatch(successFetchingPokemonsDisplay({offset, totalPage, currentPage, dataDisplay}))
      
    } catch (error: any) {
      dispatch(errorFetchingPokemons(error));
    }
  } 


  const sort = (pokemons:Pokemon[], order:Sort, totalPokemons:number, offset:number, limit:number ) =>{

    let dataDisplay: Pokemon[] = [];

    if(order === Sort.HighestNumberFirst){
      dataDisplay = pokemons.slice(totalPokemons - offset - limit, (totalPokemons - offset - limit) + limit)
                            .reverse()
    }else if(order === Sort.A_Z){
      dataDisplay = [...pokemons].sort( (a,b) => a.name.localeCompare(b.name))
                                .slice(offset, offset + limit)
    }else if(order === Sort.Z_A){
      dataDisplay = [...pokemons].sort( (a,b) => b.name.localeCompare(a.name))
                                .slice(offset, offset + limit)
    }

    return dataDisplay

  }
