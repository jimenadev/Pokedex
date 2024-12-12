import { useState } from "react";
import { ListTypePokemon } from "../redux/types/ListTypePokemon"
import TypeFilter from "./TypeFilter"

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

    const handleCheckboxChange = (label: string) => {
        setSelectedItems((prevSelected) =>
          prevSelected.includes(label)
            ? prevSelected.filter((item) => item !== label) // Deseleccionar
            : [...prevSelected, label] // Seleccionar
        );
    };


    const resetFilter = () =>{
        setSelectedItems([])
        filtered([])
    }

    const applyFilters = () =>{

        if(setSelectedItems.length>0){
            filtered(selectedItems)
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
                <button className="button-reset-filters" onClick={resetFilter}>Reset filters</button>
                <button className="button-apply-filters" onClick={applyFilters}>Apply filters</button>
            </div>


    </div>
   
    
    
}

export default TypesFilters