import { ReactNode } from "react";
import back from "./../statics/back.svg"
import next from "./../statics/next.svg"

type ContenedorProps = {
    children: ReactNode;
};

const Pager = ({ children }: ContenedorProps)  =>{
    return    <div id="pager">
    <div className="next" title="Previous"><img alt="prev"  src={back} /></div>
    <div id="outer">
        {children}
    </div>
    <div className="next" title="Next"><img alt="next"  src={next} /></div>
</div>

}

export default Pager