import { ReactNode } from "react";

const Error = ()  =>{
    return <div className="pokemon-error">
            <div><img alt="error" src="/error.svg" /></div>
            <div>No pokémon matched your search!</div>
        </div>
}

export default Error