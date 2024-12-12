import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch } from './redux/store';
import { currentPageSel, isFetchingPokemonsSel, limitSel, offsetSel, pokemonsDisplaySel, pokemonsErrSel, pokemonsSel, totalPageSel, totalPokemonsSel } from "./redux/selectors/pokemons"
import { fetchPokemons, pokemonPerPage } from "./redux/actions/pokemons"; 
import { skipPagePokemons } from "./redux/actions/pager"; 
import logo from "./statics/Pokedex-logo.svg"
import Header from './components/Header';
import Searcher from './components/Searcher';
import Order from './components/Order';
import FilterByType from './components/FilterByType';
import CardPokemon from './components/CardPokemon';
import CardList from './components/CardList';
import { Pokemon } from './redux/types/Pokemon';
import CardListLoading from './components/CardListLoading';
import CardPokemonLoading from './components/CardPokemonLoading';
import Error from './components/Error';
import Pager from './components/Pager';
import Page from './components/Page';
import { Sort } from './redux/types/sort.enum';
import Filters from './components/Filters';
import TypesFilters from './components/TypesFilters';

function App() {

  const dispatch: AppDispatch = useDispatch(); 
  const totalPokemons = useSelector(totalPokemonsSel, shallowEqual)
  const isFetchingPokemons = useSelector(isFetchingPokemonsSel, shallowEqual)
  const pokemons = useSelector(pokemonsSel, shallowEqual)
  const pokemonsDisplay = useSelector(pokemonsDisplaySel, shallowEqual)
  const pokemonsErr = useSelector(pokemonsErrSel, shallowEqual)
  const limit = useSelector(limitSel, shallowEqual)
  const offset = useSelector(offsetSel, shallowEqual)
  const totalPage = useSelector(totalPageSel, shallowEqual)
  const currentPage = useSelector(currentPageSel, shallowEqual)
  
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState(Sort.LowestNumberFirst);
  const [modalFilter, setModalFilter] = useState(false);
  const [selectedItemsFilter, setSelectedItemsFilter] = useState<string[]>([]);

  const handleSearch = (search:string) => {
    setSearch(search);
  };  

  const handleOrder = (order:Sort) => {
    setOrder(order);
  };  

  const handleFilter = (modalFilter:boolean) => setModalFilter(modalFilter)

  const onClose = () => setModalFilter(false);

  const filtered = (selectedFilter:string[]) =>{
    setSelectedItemsFilter(selectedFilter)
    console.log("selectedItemsFilter:  ",selectedItemsFilter)
    dispatch(pokemonPerPage(totalPokemons, pokemons, limit, offset, totalPage, currentPage, search, order, selectedItemsFilter));  
  }

  useEffect(() => {
    dispatch(fetchPokemons(totalPokemons));  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(pokemonPerPage(totalPokemons, pokemons, limit, offset, totalPage, currentPage, search, order, selectedItemsFilter));  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons, currentPage, search, order]);


  const handleChangePage: React.MouseEventHandler<HTMLDivElement> = (event) => {

    const target = event.currentTarget as HTMLElement;
    const typeAction: string | undefined = target.getAttribute("title")?.toString() 
    let changePage = currentPage
    if(typeAction === 'page'){
      changePage = parseInt(target.innerHTML)
    }
    dispatch(skipPagePokemons(limit, offset, changePage,totalPage,typeAction)); 

   };  

  return (
    <div className="app">
        <Filters isOpen={modalFilter} onClose={onClose}>
           <TypesFilters filtered={filtered} />
        </Filters>
      <Header>
        <div className="logo" >
            <img src={logo} alt="logo"/>
        </div>
       <Searcher handleSearch={handleSearch}/>
       <div className="filters">
          <div className="orderPokemon">
            <Order handleOrder={handleOrder} />
          </div>
          <div className="filtersPokemonType">
            <FilterByType handleFilter={handleFilter} />   
          </div>
        </div>
      </Header>

      {isFetchingPokemons && 
      <CardListLoading>
        {Array.from({ length: limit }).map((_, index) => (
          <CardPokemonLoading key={index} />
        ))}
      </CardListLoading>
      }

      { ((!isFetchingPokemons && pokemonsErr) || (!isFetchingPokemons && pokemonsDisplay.length === 0)) && <Error />}

      {!isFetchingPokemons && !pokemonsErr && pokemonsDisplay.length > 0 && 
       <CardList>
       {pokemonsDisplay.map((pokemon: Pokemon) => (
         <CardPokemon
           key={pokemon.id}
           pokemon={pokemon} 
         />
       ))}
       </CardList>
      }

    <Pager handleChangePage={handleChangePage} >
    {!isFetchingPokemons && !pokemonsErr && pokemonsDisplay.length > 0 && 
         Array.from({ length: totalPage }).map((_, index) => (
          <Page key={index} pageNumber={index + 1}  selected={currentPage === (index + 1)}  handleChangePage={handleChangePage} />
        ))
      }
    </Pager>
    </div>
  );
}

export default App;
