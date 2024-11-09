import React, { useEffect, useState } from 'react';
import logo from "./statics/Pokedex-logo.svg"
import Header from './components/Header';
import Searcher from './components/Searcher';
import Order from './components/Order';
import FilterByType from './components/FilterByType';
import CardPokemon from './components/CardPokemon';
import CardList from './components/CardList';
import { getPokemons, dataPokemon } from './API';
import { PokemonDTO } from './DTO/Pokemon.dto';
import { PokemonTypesDTO } from './DTO/PokemonTypes.dto';

function App() {

  const [pokemons, setPokemons] = useState<PokemonDTO[]>([]);
  const limit = 9;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () =>{
      const pokemonsData = await getPokemons(limit, offset);
      const pokemonsRes = pokemonsData.map((pokemon: any, index:number) => ({
        id: offset + index + 1,
        name: pokemon.name,
        number:  `#${String(offset + index + 1).padStart(3, '0')}`,
        url:pokemon.url,
        urlImage:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${offset + index + 1}.png`
      }))
      

      const pokemons = await Promise.all(
        pokemonsRes.map(async (pokemon: PokemonDTO) => {
          let types: PokemonTypesDTO[] = await dataPokemon(pokemon.url);
          return { ...pokemon, types };
        })
      );
      
      setPokemons(pokemons);
    } 
    fetchPokemons()
  }, [])


  return (
    <div className="app">
      <Header>
        <div className="logo" >
            <img src={logo} alt="logo"/>
        </div>
       <Searcher />
       <div className="filters">
          <div className="orderPokemon">
            <Order />
          </div>
          <div className="filtersPokemonType">
            <FilterByType />   
          </div>
        </div>
      </Header>
      <CardList>
      {pokemons.map((pokemon: PokemonDTO) => (
        <CardPokemon
          key={pokemon.id}
          pokemon={pokemon} 
        />
      ))}
      </CardList>
    </div>
  );
}

export default App;
