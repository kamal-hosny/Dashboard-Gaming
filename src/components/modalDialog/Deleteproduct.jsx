import React, { useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modal/modalSlice';
import { deleteProduct } from '../../store/products/act/actDeleteProduct';
import { getAllProducts } from '../../store/products/act/actGetAllProducts';
import { AllStateContext } from '../../context/AllStateContext';

const DeleteProduct = () => {
    const dispatch = useDispatch();
    const { idProduct } = useSelector((state) => state?.modal);
    const { setPageNumber } = useContext(AllStateContext);
    const removeProduct = useCallback(async () => {
        try {
            await dispatch(deleteProduct(idProduct)).unwrap();
            console.log("The product has been successfully deleted.");
            dispatch(closeModal()); // Close the modal before fetching
            setPageNumber(1)
            await dispatch(getAllProducts({ term: '', statesValue: '', pageNumber: 1 })).unwrap();
        } catch (error) {
            console.error("Error deleting the product:", error);
        }
    }, [dispatch, idProduct]);

    const handleCancel = () => {
        dispatch(closeModal());
    };

    return (
        <div className={`fixed flex flex-col border-colorBorder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[6] justify-center items-center rounded-lg w-96 bg-sectionColor border-2`}>
            <div className="modal-head w-full p-5 text-lg font-semibold justify-center text-center text-colorText1">
                Modal
            </div>
            <div className="modal-body w-full flex justify-start gap-2 p-3 border-y-2 border-colorBorder">
                <form action="" className="w-full grid grid-cols-1 gap-y-4">
                    <div className='text-colorText1'>
                        Are you sure to Delete Product?
                    </div>
                    <div className="col-span-2 flex justify-between gap-2 mt-2 items-center">
                        <div className="flex items-center gap-2">
                            <button type='button' onClick={removeProduct} className="bg-red-700 hover:bg-red-900 transition-all text-white px-3 py-2 rounded-sm">
                                Delete
                            </button>
                            <button type='button' onClick={handleCancel} className="bg-gray-700 hover:bg-gray-900 transition-all text-white px-3 py-2 rounded-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeleteProduct;
