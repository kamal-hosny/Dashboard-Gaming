import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modal/modalSlice';
import { getAllUsers } from '../../store/users/act/actGetAllUsers';
import { deleteUser } from '../../store/users/act/actDeleteUser';
import { clearUserData } from '../../store/login/auth/authSlice'; 

const DeleteProduct = () => {
    const dispatch = useDispatch();
    const idProduct = useSelector((state) => state?.modal?.idProduct);

    const removeProduct = useCallback(() => {
        dispatch(deleteUser(idProduct))
            .then(() => {
                console.log("The user has been successfully deleted.");
                dispatch(getAllUsers());
                dispatch(closeModal());
            })
            .catch((error) => {
                console.error("Error deleting the user:", error);
            });
    }, [dispatch, idProduct]);

    const handleCancel = () => {
        dispatch(closeModal());
    };

    const handleLogout = () => {
        dispatch(clearUserData()); // تسجيل الخروج
        console.log("User has been logged out.");
    };

    return (
        <div className="fixed flex flex-col border border-colorBorder top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 justify-center items-center rounded-lg w-96 bg-sectionColor">
            <div className="modal-head w-full p-5 text-lg font-semibold text-center text-colorText1">
                Delete User
            </div>
            <div className="modal-body w-full p-4 border-y border-colorBorder text-colorText1">
                <p>Are you sure you want to delete the user?</p>
            </div>
            <div className="modal-footer w-full flex justify-end p-4 gap-2">
                <button
                    type="button"
                    onClick={removeProduct}
                    className="bg-red-700 hover:bg-red-900 transition-all text-white px-4 py-2 rounded"
                >
                    Delete
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-700 hover:bg-gray-900 transition-all text-white px-4 py-2 rounded"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleLogout} // زر تسجيل الخروج
                    className="bg-blue-700 hover:bg-blue-900 transition-all text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default DeleteProduct;
