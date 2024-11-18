import { PokemonTypes } from "../redux/types/PokemonTypes";

interface TypePokemonProps {
    typePokemon: PokemonTypes;
  }

const TypePokemon: React.FC<TypePokemonProps> = ({ typePokemon }) =>{

    return <div className={typePokemon.classPokemonType}><span><img src={typePokemon.typeImg} alt=""/></span>{typePokemon.name}</div>
}

export default TypePokemon