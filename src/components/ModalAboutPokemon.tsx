import { useEffect, useState } from "react";
import back from "../statics/back-arrow.svg"
import { ExtraAboutPokemon, ExtraBaseStatsPokemon, Pokemon } from "../redux/types/Pokemon";
import { PokemonTypes } from "../redux/types/PokemonTypes";
import TypePokemon from "./TypePokemon";

interface ModalProps {
    isOpen: boolean;
    closeModalPokemon: ()=>void
    pokemon:Pokemon
    pokemonId:number
    extraAbout:ExtraAboutPokemon | undefined
    extraBaseStats: ExtraBaseStatsPokemon[] | undefined
}


const tabs = [
  { id: 'about', label: 'About', content: 'Contenido de Inicio' },
  { id: 'base-stats', label: 'Base stats', content: 'Contenido Acerca de' },
];


const ModalAboutPokemon = ({isOpen, closeModalPokemon, pokemon, pokemonId, extraAbout, extraBaseStats}: ModalProps)  =>{
  const [activeTab, setActiveTab] = useState<string>('about');
  const [activePokemon, setActivePokemon] = useState<Pokemon>();
  const [activePokemonTypes, setActivePokemonTypes] = useState<PokemonTypes[]>([]);

  useEffect(() => {
    if(pokemonId){
      setActivePokemon(pokemon)
      const types = pokemon?.types ?? [];
      setActivePokemonTypes(types)
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
                              <div className="pokemon_types">
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
                            { (activeTab === 'about') && <div id="about">
                                <table className="table_about">
                                    <tr>
                                      <td>Habitat</td>
                                      <td>{extraAbout?.habitat}</td>
                                  </tr>
                                  <tr>
                                    <td>Height</td>
                                    <td>{extraAbout?.height}cm</td>
                                  </tr>
                                  <tr>
                                    <td>Weight</td>
                                    <td>{extraAbout?.weight}kg</td>
                                  </tr>
                                  <tr>
                                    <td>Abilities</td>
                                    <td>{extraAbout?.abilities}</td>
                                  </tr>                          
                                </table>
                            </div>}
                            { (activeTab === 'base-stats') && <div id="base-stats">
                            <table className="table_base-stats">
                              {extraBaseStats?.map((baseStats:ExtraBaseStatsPokemon) =>(
                                <tr>
                                    <td>{baseStats.name}</td>
                                    <td>{baseStats.value}</td>
                                    <td className="bar">
                                      <div className="progress-bar">
                                            <div className={`progress progress-${activePokemonTypes[0]?.type }`} style={{ width: `${baseStats.value}%` }}></div>
                                        </div>
                                    </td>
                                  </tr>
                              ))}
                            
                                </table>
                            </div>
                          }
                          </div>
                  </div>
            </div>
        </div>
}

export default ModalAboutPokemon