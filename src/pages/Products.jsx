import React, { useEffect, useState, useMemo, useCallback } from 'react';
import DataTable from '../components/products/DataTable';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../store/products/act/actGetAllProducts';
import { getAllStates } from '../store/states/act/actGetAllStates';
import { getAllCategories } from '../store/category/act/actGetAllCategories';
import { Pagination } from '../components/common/Pagination';
import { Button } from "@material-tailwind/react";
import SearchProducts from '../components/products/SearchProducts';
import usePrevState from '../hook/prevState';
import Loading from '../components/common/Loading';

const Products = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [term, setTerm] = useState("");
  const { records, loading, error } = useSelector((state) => state?.allProducts);

  const prevTerm = usePrevState(term);

  // Memoizing dispatch actions to avoid unnecessary recalculations
  const fetchCategories = useCallback(() => dispatch(getAllCategories()), [dispatch]);
  const fetchStates = useCallback(() => dispatch(getAllStates()), [dispatch]);
  const fetchProducts = useCallback(() => {
    dispatch(getAllProducts({ pageNumber, term }));
  }, [dispatch, pageNumber, term]);

  useEffect(() => {
    fetchCategories();
    fetchStates();
  }, [fetchCategories, fetchStates]);

  useEffect(() => {
    if (term === "") {
      fetchProducts();
    } else if (prevTerm !== term) {
      const debounceSearch = setTimeout(fetchProducts, 1000);
      setPageNumber(1)
      return () => {
        clearTimeout(debounceSearch);
      };
    }
    
  }, [pageNumber, term, prevTerm, fetchProducts]);

  // Memoizing records 
  const memoizedRecords = useMemo(() => records, [records]);

  return (
    <div className='flex flex-col gap-4'>
      <div className="title text-lg font-semibold text-colorText1">
        Products
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-end w-full gap-4'>
          <SearchProducts term={term} setTerm={setTerm} />
          <Link to="create">
            <Button className='bg-mainColor'>Add product</Button>
          </Link>
        </div>

        <Loading loading={loading} error={error}>
          <>
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              pagination={memoizedRecords?.meta?.pagination} // Use memoized records
            />
            <DataTable data={memoizedRecords} pageNumber={pageNumber} /> {/* Use memoized records */}
          </>
        </Loading>
      </div>
    </div>
  );
};

export default React.memo(Products);
