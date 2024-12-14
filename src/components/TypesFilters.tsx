import { useState } from "react";
import { ListTypePokemon } from "../redux/types/ListTypePokemon"
import TypeFilter from "./TypeFilter"
import info from "./../statics/info.svg"

const listTypePokemon:ListTypePokemon[] = [
    {type:"Normal"},
    {type:"Fighting"},
    {type:"Flying"},
    {type:"Poison"},
    {type:"Ground"},
    {type:"Steel"},
    {type:"Fire"},
    {type:"Water"},
    {type:"Grass"},
    {type:"Dragon"},
    {type:"Dark"},
    {type:"Fairy"},
    {type:"Electric"},
    {type:"Rock"},
    {type:"Bug"},
    {type:"Ghost"},
    {type:"Psychic"},
    {type:"Ice"},    
]

interface Props {
    filtered: (filter:string[])=>void;
  }

const TypesFilters = ({filtered}: Props) =>{

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [infoVisible, setInfoVisible] = useState(false)

    const handleCheckboxChange = (label: string) => {
        setSelectedItems((prevSelected) =>
          prevSelected.includes(label)
            ? prevSelected.filter((item) => item !== label) // Deseleccionar
            : [...prevSelected, label] // Seleccionar
        );
    };

    const toggleVisibility = () => {
        // Aparece el estado
        setInfoVisible(true);
        // Desaparece después de 3 segundos
        setTimeout(() => {
            setInfoVisible(false);
        }, 5000);
      };
    
    const resetFilter = () =>{
        setSelectedItems([])
        filtered([])
        toggleVisibility()
        
    }

    const applyFilters = () =>{

        if(setSelectedItems.length>0){
            filtered(selectedItems)
            toggleVisibility()
        }

    }


    return <div className="container-types">
            <h1 className="type-title">Type</h1>
            <div className="container-names-types">
            {listTypePokemon.map((type, index) => (
                <TypeFilter
                        key={index} 
                        type={type.type} 
                        index={index}  
                        checked={selectedItems.includes(type.type)}
                        handleCheckboxChange={handleCheckboxChange}/>
            ))}
            </div>
            
            <div className="buttons-types">
                <div className={`info ${infoVisible ? "open-info": "close-info"}`}><span><img src={info} alt="info" /></span>changes applied!!</div>
                <div className="button-box">
                    <button className="button-reset-filters" onClick={resetFilter}>Reset filters</button>
                    <button className="button-apply-filters" onClick={applyFilters}>Apply filters</button>
                </div>
            </div>


    </div>
   
    
    
}

export default TypesFilters