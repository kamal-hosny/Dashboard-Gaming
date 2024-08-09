import React from 'react'

const SearchProducts = ({term, setTerm}) => {
  return (
    <input value={term} onChange={(e)=>{setTerm(e.target.value)}} className="p-2 border-colorText2 bg-mainColorBackground text-colorText1 border rounded-lg" type="search" name="" id="" />
  )
}

export default SearchProducts