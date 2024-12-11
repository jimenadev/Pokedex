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

const TypesFilters = () =>{

    return <div className="container-types">
            <h1 className="type-title">Type</h1>
            <div className="container-names-types">
            {listTypePokemon.map((type, index) => (
                <TypeFilter type={type.type} index={index} key={index} />
            ))}
            </div>
            <div className="buttons-types">
                <button className="button-reset-filters">Reset filters</button>
                <button className="button-apply-filters">Apply filters</button>
            </div>


    </div>
   
    
    
}

export default TypesFilters