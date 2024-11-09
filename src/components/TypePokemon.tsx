import { PokemonTypesDTO } from "../DTO/PokemonTypes.dto";

interface TypePokemonProps {
    typePokemon: PokemonTypesDTO;
  }

const TypePokemon: React.FC<TypePokemonProps> = ({ typePokemon }) =>{

    return <div className={typePokemon.classPokemonType}><span><img src={typePokemon.typeImg} alt=""/></span>{typePokemon.name}</div>
}

export default TypePokemon