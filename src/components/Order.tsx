import { useState } from "react";

const Order = () =>{

    const [selected, setSelected] = useState('Lowest Number First');
    const [isOpen, setIsOpen] = useState(false);

    const [isOpenArrow, setIsOpenArrow] = useState(false);

    const options = ['Lowest Number First', 'Highest Number First', 'Alphabetically (A-Z)', 'Alphabetically (Z-A)'];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setIsOpenArrow(!isOpenArrow);
    }

    const selectOption = (option: string) => {
        setSelected(option);
        setIsOpen(false);
        setIsOpenArrow(false);
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


