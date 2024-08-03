import React from 'react'
import DataTable from '../components/products/DataTable'
import { Link } from 'react-router-dom'

const Products = () => {

  return (
    <div className='flex flex-col gap-4'>
      <div className="title text-lg font-semibold text-colorText1">
      Products
      </div>
      <div className='self-end'>
        <Link to="/create-products">
        <button className='bg-mainColor hover:bg-mainColorHover transition p-2 rounded-md text-white'>Add product</button>
        </Link>
      </div>
    <DataTable />
    </div>
  )
}

export default Products