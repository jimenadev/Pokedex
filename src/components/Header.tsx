import { ReactNode } from "react";

type ContenedorProps = {
    children: ReactNode;
  };

const Header = ({ children }: ContenedorProps) =>{
    return <header>{children}</header>
}

export default Header