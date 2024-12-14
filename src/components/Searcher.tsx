import { useState } from "react";

import IconSearch from "./../statics/search.svg"

type ContenedorProps = {
    handleSearch: (search:string) => void;
};

const Searcher = ({handleSearch}: ContenedorProps) =>{
    const [search, setSearch] = useState("");

    const searching = () => {
        handleSearch(search);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
      };
      
    return  <div className="search">
                <div className="search-icon"><img src={IconSearch} alt="search" /></div>
                <div className="search-input"><input type="text" id="search-input" value={search} placeholder="Pokemon name, number or type" onChange={handleInputChange} /></div>
                <div className="search-button"> <button className="search-input-button" onClick={searching}>Search</button></div>
            </div>;
}

export default Searcher