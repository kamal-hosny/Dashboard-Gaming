import React, { useEffect } from 'react'
import DataTable from '../components/products/DataTable'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../store/products/act/actGetAllProducts'
import { getAllStates } from '../store/states/act/actGetAllStates'
import { getAllCategories } from '../store/category/act/actGetAllCategories'
import { Pagination } from '../components/common/Pagination'



const Products = () => {
  const dispatch = useDispatch()
  const [active, setActive] = React.useState(1);
  const {records, loading, error} = useSelector((state) => state?.allProducts)



  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllStates());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getAllProducts(active));
}, [dispatch, active]);

  return (
    <div className='flex flex-col gap-4'>
      <div className="title text-lg font-semibold text-colorText1">
      Products
      </div>
      <div className=' flex  items-center justify-between w-full'>
      <Pagination active={active} setActive={setActive} pagination={records?.meta?.pagination} />
        <Link to="create">
        <button className='bg-mainColor hover:bg-mainColorHover transition p-2 rounded-md text-white'>Add product</button>
        </Link>
      </div>
    <div>
      <DataTable data={records} />
    </div>
    </div>

  )
}

export default Products