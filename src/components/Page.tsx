import { ReactNode } from "react";
interface PageProps {
  selected:boolean;
  pageNumber:number;
}

const Page: React.FC<PageProps>  = ({ selected, pageNumber})  =>{
    return  <div className={ selected ? 'page-selected' : ''} >{pageNumber}</div>

}

export default Page