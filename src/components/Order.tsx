import { useState } from "react";
import { Sort } from "../redux/types/sort.enum";

type ContenedorProps = {
    handleOrder: (order:Sort) => void;
};

const Order = ({handleOrder}: ContenedorProps) =>{

    const [selected, setSelected] = useState(Sort.LowestNumberFirst);
    const [isOpen, setIsOpen] = useState(false);

    const [isOpenArrow, setIsOpenArrow] = useState(false);

    const options = [Sort.LowestNumberFirst, Sort.HighestNumberFirst, Sort.A_Z, Sort.Z_A];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setIsOpenArrow(!isOpenArrow);
    }

    const selectOption = (option: Sort) => {
        setSelected(option);
        setIsOpen(false);
        setIsOpenArrow(false);
        handleOrder(option);
    };


    return   <div className="custom-select-container">
                <div className="custom-select-display" onClick={toggleDropdown}>
                    {selected} <span className={isOpenArrow ? 'ep--arrow-up-bold' : 'ep--arrow-down-bold'}></span>
                </div>
                {isOpen && (
                <ul className="custom-select-options">
                    {options.map(option => (
                    <li key={option} className={option === selected  ? 'selectedOrder' : '' } onClick={() => selectOption(option)}>
                        {option}  <span className={option === selected  ? 'material-symbols--check' : ''}></span> 
                    </li>
                    ))}
                </ul>
                )}
            </div>
}

export default Order


