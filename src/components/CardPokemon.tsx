import { ReactNode } from "react";
import grass from "../statics/icon/grass.svg";
import poison from "../statics/icon/poison.svg";

//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png
//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png
const CardPokemon = () =>{
    return <div className="pokemon-card">
                <div className="pokemon-image">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="" />
                </div>
                <div className="pokemon-text">
                    <h1 className="pokemon-name">Bulbasaur</h1>
                    <p className="pokemon-number">#001</p>
                    <div className="pokemon-types">
                        <div className="pokemon-type"><span><img src={grass} alt=""/></span>Grass</div>
                        <div className="pokemon-type"><span><img src={poison} alt=""/></span>Poison</div>
                    </div>
                </div>
            </div>
}

export default CardPokemon