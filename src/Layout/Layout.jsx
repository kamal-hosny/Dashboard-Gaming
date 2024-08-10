import React from 'react';
import { Outlet } from 'react-router-dom';
import VerticalNavbar from '../components/VerticalNavbar/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar/HorizontalNavbar';
import ModalManager from '../util/ModalManger';

const Layout = () => {
  return (
    <>
      <ModalManager />
      <div className="flex w-full h-full ">
        <VerticalNavbar />
        <div className="w-full h-full">
          <HorizontalNavbar />
          <div className="p-4 px-8 ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
