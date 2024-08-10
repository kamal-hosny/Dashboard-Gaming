import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { closeModal } from '../../store/modal/modalSlice';

const LogOut = () => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const removeUser = () => {
        Cookies.remove('auth');
        dispatch(closeModal()); 
        navigate("/", { replace: true }); 
    };

    const cancel = () => {
        dispatch(closeModal()); 
    };

    return (
        <div
            className={`fixed flex flex-col border-colorBorder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[6] justify-center items-center rounded-lg w-96 bg-sectionColor border-2 `}
        >
            <div className="modal-head w-full p-5 text-lg font-semibold justify-center text-center text-colorText1">
                Log out
            </div>
            <div className="modal-body w-full flex justify-start gap-2 p-3 border-y-2 border-colorBorder">
                <form action="" className="w-full grid grid-cols-1 gap-y-4">
                    <div className='text-colorText1 w-full'>
                        Are you ready to leave the site?
                    </div>
                    <div className="col-span-2 flex justify-between gap-2 mt-2 items-center">
                        <div className="flex items-center gap-2">
                            <button type='button' onClick={removeUser} className="bg-red-700 hover:bg-red-900 transition-all text-white px-3 py-2 rounded-sm">
                                Leave
                            </button>
                            <button type='button' onClick={cancel} className="bg-gray-700 hover:bg-gray-900 transition-all text-white px-3 py-2 rounded-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogOut;
