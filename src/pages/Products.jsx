import React, { useEffect, useState, useMemo, useCallback, useContext } from 'react';
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
import { AllStateContext } from '../context/AllStateContext';
import { DrawerDefault } from '../components/products/DrawerDefault';

const Products = () => {
  const { mobileSize, openMenu } = useContext(AllStateContext);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [statesValue, setStatesValue] = React.useState("");

  const [term, setTerm] = useState("");
  const { records, loading, error } = useSelector((state) => state?.allProducts);

  const prevTerm = usePrevState(term);

  // Memoizing dispatch actions to avoid unnecessary recalculations
  const fetchCategories = useCallback(() => dispatch(getAllCategories()), [dispatch]);
  const fetchStates = useCallback(() => dispatch(getAllStates()), [dispatch]);
  const fetchProducts = useCallback(() => {
    dispatch(getAllProducts({ pageNumber, term, statesValue }));
  }, [dispatch, pageNumber, term, statesValue]);

  useEffect(() => {
    fetchCategories();
    fetchStates();
  }, [fetchCategories, fetchStates]);

  useEffect(() => {
    if (term === "") {
      fetchProducts();
    } else if (prevTerm !== term) {
      const debounceSearch = setTimeout(fetchProducts, 1000);
      setPageNumber(1);
      return () => {
        clearTimeout(debounceSearch);
      };
    }
  }, [pageNumber, term, prevTerm, fetchProducts, statesValue]);

  // Memoizing records 
  const memoizedRecords = useMemo(() => records, [records]);

  return (
    <>
    <div className='products pt-3'>
      <div className={`flex flex-col gap-4 ${!mobileSize && !openMenu && (" pl-10 ")}`}>
        <div className="main-title  font-semibold text-colorText1">
          Products
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-end flex-col justify-end w-full gap-4'>
            
            <Link to="create">
              <Button className='bg-mainColor normal-case py-2 px-4 rounded-sm cursor-pointer'>Create</Button>
            </Link>
            <div className='flex items-center justify-center'><SearchProducts term={term} setTerm={setTerm} />
            <DrawerDefault statesValue={statesValue} setStatesValue={setStatesValue} /></div>
          </div>

          {loading ? (
            <div className='absolute w-5/6 h-5/6 flex justify-center items-center'>
              <Loading loading={loading} error={error}>
                .
              </Loading>
            </div>
          ) : (
            <Loading loading={loading} error={error}>
              <Pagination
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                pagination={memoizedRecords?.meta?.pagination} // Use memoized records
              />
              <DataTable data={memoizedRecords} pageNumber={pageNumber} /> {/* Use memoized records */}
            </Loading>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default React.memo(Products);
