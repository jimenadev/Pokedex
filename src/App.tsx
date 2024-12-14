import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch } from './redux/store';
import { activePokemonSel, currentPageSel, extraAboutSel, extraBaseStatsSel, isFetchingPokemonsSel, limitSel, offsetSel, pokemonsDisplaySel, pokemonsErrSel, pokemonsSel, totalPageSel, totalPokemonsSel } from "./redux/selectors/pokemons"
import { fetchPokemons, pokemonPerPage } from "./redux/actions/pokemons"; 
import { skipPagePokemons } from "./redux/actions/pager"; 
import { showFeaturesPokemon } from "./redux/actions/activatePokemon"; 
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
import ModalAboutPokemon from './components/ModalAboutPokemon';

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
  const extraAbout = useSelector(extraAboutSel, shallowEqual)
  const extraBaseStats = useSelector(extraBaseStatsSel, shallowEqual)

  
  //const isActivePokemon = useSelector(isActivePokemonSel, shallowEqual)
  const activePokemon = useSelector(activePokemonSel, shallowEqual)
  
  const [search, setSearch] = useState("");
  const [reset, setReset] = useState(false);
  const [order, setOrder] = useState(Sort.LowestNumberFirst);
  const [modalFilter, setModalFilter] = useState(false);
  const [selectedItemsFilter, setSelectedItemsFilter] = useState<string[]>([]);
  const [pokemonId, setPokemonId] = useState(0);
  const [isOpenModalPokemon, setIsOpenModalPokemon] = useState(false);

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
    if(selectedFilter.length===0){
      setReset(true)
    }

  }

  const openModalPokemon = (pokemonId:number) =>{
    if(pokemonId){
      setPokemonId(pokemonId);
      setIsOpenModalPokemon(true)
    }else{
      setPokemonId(0);
      setIsOpenModalPokemon(false)
    }
  }
  const closeModalPokemon = () =>{
    setPokemonId(0);
    setIsOpenModalPokemon(false)
  }

  useEffect(() => {
    dispatch(fetchPokemons(totalPokemons));  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  useEffect(() => {
    if(pokemons.length>0){
      dispatch(pokemonPerPage(totalPokemons, pokemons, limit, offset, totalPage, currentPage, search, order, selectedItemsFilter));  
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons, currentPage, search, order]);

  useEffect(() => {
      dispatch(showFeaturesPokemon(pokemons, pokemonId))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonId]);

  useEffect(() => {
   
    if(selectedItemsFilter.length > 0){
      dispatch(pokemonPerPage(totalPokemons, pokemons, limit, offset, totalPage, currentPage, search, order, selectedItemsFilter));  
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItemsFilter]);

  useEffect(() => {
    if(reset){
      dispatch(pokemonPerPage(totalPokemons, pokemons, limit, offset, totalPage, currentPage, search, order, selectedItemsFilter));  
      setReset(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

 

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
      <ModalAboutPokemon isOpen={isOpenModalPokemon}  closeModalPokemon={closeModalPokemon} pokemon={activePokemon[0]} pokemonId={pokemonId} extraAbout={extraAbout}  extraBaseStats={extraBaseStats}/>
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
       {pokemonsDisplay.map((pokemon: Pokemon, index:number) => (
         <CardPokemon
           key={`${pokemon.name}-${pokemon.id}-${index}`}
           index={`${pokemon.name}-${index}`}
           pokemon={pokemon} 
           openModalPokemon={openModalPokemon}
         />
       ))}
       </CardList>
      }

    <Pager handleChangePage={handleChangePage} >
    {!isFetchingPokemons && !pokemonsErr && pokemonsDisplay.length > 0 && 
         Array.from({ length: totalPage }).map((_, index) => (
          <Page   key={`pokemon-${index}`} pageNumber={index + 1}  selected={currentPage === (index + 1)}  handleChangePage={handleChangePage} />
        ))
      }
    </Pager>
    </div>
  );
}

export default App;
