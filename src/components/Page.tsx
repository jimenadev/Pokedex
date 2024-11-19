import { ReactNode } from "react";
interface PageProps {
  handleChangePage: (event: React.MouseEvent<HTMLDivElement>) => void;
  selected:boolean;
  pageNumber:number;
}

const Page: React.FC<PageProps>  = ({ handleChangePage, selected, pageNumber})  =>{
    return  <div title="page" className={ selected ? 'page-selected' : ''} onClick={handleChangePage}>{pageNumber}</div>

}

export default Page