import { ReactNode } from "react";
import error from "./../statics/error.svg"

const Error = ()  =>{
    return <div className="pokemon-error">
            <div><img alt="error" src={error} /></div>
            <div>No pokémon matched your search!</div>
        </div>
}

export default Error