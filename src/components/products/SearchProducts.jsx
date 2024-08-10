import React from 'react'

const SearchProducts = ({term, setTerm}) => {
  return (
    <input value={term} onChange={(e)=>{setTerm(e.target.value)}} placeholder='Search' className="p-2 px-3 rounded-s-full border-colorText2 bg-mainColorBackground focus:outline-none focus:border-mainColor text-colorText1 border " type="search" name="" id="" />
  )
}

export default SearchProducts
