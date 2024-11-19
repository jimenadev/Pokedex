import { createAction } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { ChangePagePokemonsPayload, ErrorFetchingPokemonsPayload } from "../types/Pokemon";

export const changePagePokemon = createAction<ChangePagePokemonsPayload>("CHANGE_PAGE_POKEMONS");
export const errorChangePagePokemon = createAction<ErrorFetchingPokemonsPayload>("ERROR_CHANGE_PAGE_POKEMONS");

export const skipPagePokemons = (
    limit:number,
    offset:number,
    currentPage:number,
    totalPage:number,
    typeAction:string | undefined,
):  AppThunk  => async (dispatch) => {
    try {
      let newPage = 1;
      let newOffset = 0;
      switch(typeAction){
        case 'prev':
          if(currentPage>1){
            newPage = currentPage - 1;
            newOffset = offset - limit;
          }
          break;
        case 'next':
          if(currentPage<totalPage){
            newPage = currentPage + 1;
            newOffset = offset + limit;
          }
          break;
        case 'page':
            newPage = currentPage;
            newOffset = limit*(newPage-1);
          break;
      }
      
      dispatch(changePagePokemon({offset:newOffset, currentPage:newPage}));
    } catch (error: any) {
      dispatch(errorChangePagePokemon(error));
    }
  } 



