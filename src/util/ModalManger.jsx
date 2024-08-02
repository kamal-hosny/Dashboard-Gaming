import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../store/modal/modalSlice';
import Login from '../components/modalDialog/Login';
import LogOut from '../components/modalDialog/LogOut';
import Modal from '../Layout/modal/Modal';

const ModalManager = () => {
    const dispatch = useDispatch();
    const { isOpen, componentName } = useSelector((state) => state.modal);

    const closeModalHandler = () => dispatch(closeModal());

    const componentsLookup = { Login, LogOut };
    let renderComponent;

    if (componentName) {
        const SelectedComponent = componentsLookup[componentName];
        if (SelectedComponent) {
            renderComponent = <SelectedComponent />;
        }
    }

    return (
        <Modal isOpen={isOpen} closeModalHandler={closeModalHandler}>
            {renderComponent}
        </Modal>
    );
};

export default ModalManager;
