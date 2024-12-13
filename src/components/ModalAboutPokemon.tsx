import { useEffect, useState } from "react";
import back from "../statics/back-arrow.svg"
import { Pokemon } from "../redux/types/Pokemon";
import { PokemonTypes } from "../redux/types/PokemonTypes";
import TypePokemon from "./TypePokemon";

interface ModalProps {
    isOpen: boolean;
    closeModalPokemon: ()=>void
    pokemon:Pokemon
    pokemonId:number
}


const tabs = [
  { id: 'about', label: 'About', content: 'Contenido de Inicio' },
  { id: 'base-stats', label: 'Base stats', content: 'Contenido Acerca de' },
  { id: 'evolution', label: 'Evolution', content: 'Contenido de Contacto' },
];


const ModalAboutPokemon = ({isOpen, closeModalPokemon, pokemon, pokemonId}: ModalProps)  =>{
  const [activeTab, setActiveTab] = useState<string>('about');
  const [activePokemon, setActivePokemon] = useState<Pokemon>();
  const [activePokemonTypes, setActivePokemonTypes] = useState<PokemonTypes[]>([]);

  useEffect(() => {
    if(pokemonId){
      setActivePokemon(pokemon)
      const types = pokemon?.types ?? [];
      setActivePokemonTypes(types)
      console.log("activePokemonTypes: ",pokemon)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon, pokemonId]);


  if(!activePokemon) return null


    return <div  className={`modal ${isOpen ? "modalPokemon-open " : "modalPokemon-close"}`}>
            <div className={`modal_content pokemonTypeModal-${activePokemonTypes[0]?.type }`} >
                <div className={`modal_content_header pokemonTypeModal-${activePokemonTypes[0]?.type }`} >
                  <div className="modal_back"  onClick={closeModalPokemon}>  
                      <img src={back} alt="" className="back-arrow" /> 
                  </div>
                  <div  className="modal_pokemon">
                      <div className="pokemon_img">
                        <img className="poke_img" src={activePokemon?.urlImage} alt="" />
                      </div>
                      <div className="pokemon_desc">
                        <div className="pokemon_number">{activePokemon?.number}</div>
                        <div className="pokemon_name">{activePokemon?.name}</div>
                        <div className="pokemon_type">
                        {activePokemonTypes.map((type: PokemonTypes, index) => (
                              <TypePokemon
                              key={index}
                              typePokemon={type} 
                              />
                          ))}
                        </div>
                      </div>
                  </div>
                </div>
                <div className="modal_content_tab">
                    <div className="modal_content_tab_header">
                      <ul className="tab">
                      {tabs.map((tab) => (
                        <li 
                          className={`tab_item ${activeTab === tab.id ? "tab_item_active": "" }`}
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          >{tab.label}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="modal_content_tab_content">
                      {tabs.find((tab) => tab.id === activeTab)?.content}
                    </div>
                </div>
            </div>
        </div>
}

export default ModalAboutPokemon