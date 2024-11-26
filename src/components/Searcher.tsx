import { useState } from "react";

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
                <span className="ion--search-outline"></span>
                <input type="text" id="search-input" value={search} placeholder="Pokemon name, number or type" onChange={handleInputChange} />
                <button className="search-input-button" onClick={searching}>Search</button>
            </div>;
}

export default Searcher