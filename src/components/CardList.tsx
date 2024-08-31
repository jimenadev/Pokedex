import { ReactNode } from "react";

type ContenedorProps = {
    children: ReactNode;
};

const CardList = ({ children }: ContenedorProps)  =>{
    return <div className="pokemon-card-list">{children}</div>
}

export default CardList