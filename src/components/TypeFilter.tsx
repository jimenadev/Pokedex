interface Props {
    type:string
    index:number;
    handleCheckboxChange: (label:string)=>void;
    checked:boolean;
  }

const TypeFilter = ({type, index,checked, handleCheckboxChange}:Props)  =>{

    return <div className="type-item">
    <input 
        type="checkbox" 
        id={`checkbox${index+1}`} 
        checked={checked}
        onChange={() => handleCheckboxChange(type)} />
    <label htmlFor={`checkbox${index+1}`}>{type}</label>
  </div>
}

export default TypeFilter