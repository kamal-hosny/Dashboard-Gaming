import React from 'react';

const Modal = ({isOpen , children , closeModalHandler}) => {


    return (
        <>
            <div 
                onClick={closeModalHandler}
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                className={`fixed h-full w-full z-[5] ${isOpen ? 'modal-show' : 'modal-hide'}`}>
            </div>
            {children}
        </>
    );
}

export default Modal;
