import { ReactNode } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch } from './../redux/store';
import { currentPageSel, limitSel, offsetSel, totalPageSel } from "./../redux/selectors/pokemons"
import back from "./../statics/back.svg"
import next from "./../statics/next.svg"

type ContenedorProps = {
    handleChangePage: (event: React.MouseEvent<HTMLDivElement>) => void;
    children: ReactNode;
};

const Pager = ({ handleChangePage, children}: ContenedorProps)  =>{

    const dispatch: AppDispatch = useDispatch(); 
    const limit = useSelector(limitSel, shallowEqual)
    const offset = useSelector(offsetSel, shallowEqual)
    const totalPage = useSelector(totalPageSel, shallowEqual)
    const currentPage = useSelector(currentPageSel, shallowEqual)
    



    return    <div id="pager">
    <div className="prev" title="prev" onClick={handleChangePage}><img alt="prev"  src={back} /></div>
    <div id="outer">
        {children}
    </div>
    <div className="next" title="next" onClick={handleChangePage}><img alt="next"  src={next} /></div>
</div>

}

export default Pager