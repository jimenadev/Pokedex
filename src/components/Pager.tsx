import { ReactNode } from "react";
import back from "./../statics/back.svg"
import next from "./../statics/next.svg"

type ContenedorProps = {
    handleChangePage: (event: React.MouseEvent<HTMLDivElement>) => void;
    children: ReactNode;
};

const Pager = ({ handleChangePage, children}: ContenedorProps)  =>{


    return    <div id="pager">
    <div className="prev" title="prev" onClick={handleChangePage}><img alt="prev"  src={back} /></div>
    <div id="outer">
        {children}
    </div>
    <div className="next" title="next" onClick={handleChangePage}><img alt="next"  src={next} /></div>
</div>

}

export default Pager