import { useState } from "react";
import back from "../statics/back-arrow.svg"
import { Pokemon } from "../redux/types/Pokemon";

interface ModalProps {
    isOpen: boolean;
    closeModalPokemon: ()=>void
    pokemon:Pokemon
}


const ModalAboutPokemon = ({isOpen, closeModalPokemon, pokemon}: ModalProps)  =>{
  const [activeTab, setActiveTab] = useState<string>('about');

  const tabs = [
    { id: 'about', label: 'About', content: 'Contenido de Inicio' },
    { id: 'base-stats', label: 'Base stats', content: 'Contenido Acerca de' },
    { id: 'evolution', label: 'Evolution', content: 'Contenido de Contacto' },
  ];

  if(!pokemon) return null

    return <div  className={`modal ${isOpen ? "modalPokemon-open " : "modalPokemon-close"}`}>
            <div className="modal_content">
                <div className="modal_content_header">
                  <div className="modal_back"  onClick={closeModalPokemon}>  
                      <img src={back} alt="" className="back-arrow" /> 
                  </div>
                  <div  className="modal_pokemon">
                      <div className="pokemon_img">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam reiciendis voluptatum, reprehenderit harum eos, tempora non officiis eius labore, aperiam alias. Voluptates similique porro, sit itaque officia expedita provident rem.</div>
                      <div className="pokemon_desc">
                        <div className="pokemon_number">{pokemon.number}</div>
                        <div className="pokemon_name">{pokemon.name}</div>
                        <div className="pokemon_type">fff</div>
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