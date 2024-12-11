interface Props {
    type:string
    index:number;
  }

const TypeFilter = ({type, index}:Props)  =>{

    return <div className="type-item">
    <input type="checkbox" id={`checkbox${index+1}`} />
    <label htmlFor={`checkbox${index+1}`}>{type}</label>
  </div>
}

export default TypeFilter