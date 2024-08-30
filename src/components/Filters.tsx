const Filters = () =>{
    return  <div className="filters">
                <div className="selectMultiple">
                    <select>
                        <option value="1">Lowest Number First</option>
                        <option value="2">Highest Number First</option>
                        <option value="3">Alphabetically (A-Z)</option>
                        <option value="4">Alphabetically (Z-A)</option>
                    </select>
                </div>
                <div className="filtersPokemonType">
                    <div className="filterType">
                        Filters
                    </div>
                </div>
            </div>;
}

export default Filters