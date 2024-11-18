import { ReactNode } from "react";

type ContenedorProps = {
    children: ReactNode;
};

const CardListLoading = ({ children }: ContenedorProps)  =>{
    return <div className="pokemon-card-list">{children}</div>
}

export default CardListLoading