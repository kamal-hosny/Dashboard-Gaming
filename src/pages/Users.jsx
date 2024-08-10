import React, { useCallback, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/users/Card';
import { getAllUsers } from '../store/users/act/actGetAllUsers';
import "../style/userStyle.css";
import Loading from '../components/common/Loading';
import { AllStateContext } from '../context/AllStateContext';

const Users = () => {
  const dispatch = useDispatch(); 
  const { records, loading, error } = useSelector((state) => state?.getAllUsers);

  const { mobileSize, openMenu } = useContext(AllStateContext);

  const fetchUsers = useCallback(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);


  return (
    <>
      <div className="users">
        <div className={`flex flex-col gap-8 ${!mobileSize && !openMenu && (" pl-10 ") }` }>
          <div className="main-title  font-semibold text-colorText1 ">
            Users
          </div>
          <Loading loading={loading} error={error}>
            <div className="cards justify-center flex flex-wrap gap-4">
              {records?.map((user) => (
                <Card key={user.id} user={user} />
              ))}
            </div>
          </Loading>

        </div>
      </div>
    </>
  );
};

export default Users;
