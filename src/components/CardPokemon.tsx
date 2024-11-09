import { PokemonDTO } from './../DTO/Pokemon.dto';
import { PokemonTypesDTO } from "../DTO/PokemonTypes.dto";
import TypePokemon from "./TypePokemon";

interface CardPokemonProps {
    pokemon: PokemonDTO;
  }

const CardPokemon: React.FC<CardPokemonProps> = ({ pokemon }) =>{
    console.log("pokemon: ",pokemon)
    return <div className={`pokemon-card pokemonCard-${pokemon.types[0].type}`}>
                <div className="pokemon-image">
                    <img src={pokemon.urlImage} alt="" />
                </div>
                <div className="pokemon-text">
                    <h1 className="pokemon-name">{pokemon.name}</h1>
                    <p className="pokemon-number">{pokemon.number}</p>
                    <div className="pokemon-types">
                    {pokemon.types.map((type: PokemonTypesDTO) => (
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