import TypePokemon from "./TypePokemon";
import { Pokemon } from '../redux/types/Pokemon';
import { PokemonTypes } from "../redux/types/PokemonTypes";

interface CardPokemonProps {
    pokemon: Pokemon;
  }

const CardPokemon: React.FC<CardPokemonProps> = ({ pokemon }) =>{
    const types = pokemon.types ?? [];
    return <div className={`pokemon-card pokemonCard-${types[0].type }`}>
                <div className="pokemon-image">
                    <img src={pokemon.urlImage} alt="" />
                </div>
                <div className="pokemon-text">
                    <h1 className="pokemon-name">{pokemon.name}</h1>
                    <p className="pokemon-number">{pokemon.number}</p>
                    <div className="pokemon-types">
                    {types.map((type: PokemonTypes) => (
                        <TypePokemon
                        key={pokemon.id}
                        typePokemon={type} 
                        />
                    ))}
                    </div>
                </div>
            </div>
}

export default CardPokemon