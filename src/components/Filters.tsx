import React, { useEffect, useState } from "react";
import iconClose from "./../statics/close.svg"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }

const Filters = ({isOpen, onClose, children}: ModalProps) =>  {
    
    return  <div className={`modal-overlay ${isOpen ? "modal-open " : "modal-close"}`} onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content-titles" >
                        <h1 className="modal-title">Filters</h1>
                        <button className="modal-close" onClick={onClose}>
                            <img src={iconClose} alt="" />
                        </button>
                    </div>
                   <div className="linea"></div>
                   <div className="modal-content-filters">
                    {children}
                   </div>
                   
                </div>
            </div>
}

export default Filters