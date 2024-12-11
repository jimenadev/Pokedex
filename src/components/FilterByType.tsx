import { useState } from "react";

type ContenedorProps = {
    handleFilter: (modalFilter:boolean) => void;
};


const FilterByType = ({handleFilter}: ContenedorProps) =>{

    const openModalFilter = () => {
        handleFilter(true)
    }

    return  <div className="filterType" onClick={openModalFilter}>
                <span className="bi--filter"></span> Filter
            </div>
}

export default FilterByType