import TypePokemon from "./TypePokemon";
import { Pokemon } from '../redux/types/Pokemon';
import { PokemonTypes } from "../redux/types/PokemonTypes";

interface CardPokemonProps {
    index:string;
    pokemon: Pokemon;
    openModalPokemon: (pokemonId:number) => void
}

const CardPokemon: React.FC<CardPokemonProps> = ({ index, pokemon, openModalPokemon }) =>{
    const types = pokemon.types ?? [];
    return <div key={index} className={`pokemon-card pokemonCard-${types[0].type }`}  onClick={() => openModalPokemon(pokemon.id)}>
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