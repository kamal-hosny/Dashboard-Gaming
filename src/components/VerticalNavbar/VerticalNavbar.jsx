import React, { useContext, useMemo } from "react";
import { AllStateContext } from "../../context/AllStateContext";


import { NavLink } from "react-router-dom";

import InventoryIcon from "@mui/icons-material/Inventory";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modal/modalSlice";


const menuItems = [
    {
        title: "Products",
        icon: <InventoryIcon fontSize="small" />,
        path: "/products",
    },
    {
        title: "Checking Orders",
        icon: <GroupsIcon fontSize="small" />,
        path: "/checking-orders",
    },
    {
        title: "Notification",
        icon: <NotificationsIcon fontSize="small" />,
        path: "/notification",
    },
];

const VerticalNavbar = () => {
    const dispatch = useDispatch();
    const { mobileSize, openMenu, changeMenuValue } = useContext(AllStateContext);

    const renderedMenuItems = useMemo(() => {
        return menuItems.map((item, index) => (
            <li key={index}>
                <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                        `${openMenu ? "p-[15px] w-12" : "w-full"} flex items-center h-12 whitespace-nowrap  gap-2 p-3 transition-all text-colorText2 rounded-lg my-1 sm:text-base text-xs ${
                            isActive ? "bg-mainColor text-sectionColor hover:bg-mainColorHover " : "hover:bg-sectionColor"
                        }`
                    }
                >
                    {item.icon}
                    {!openMenu && <span>{item.title}</span>}
                </NavLink>
            </li>
        ));
    }, [openMenu]);

    return (
        <header
            className={`${
                openMenu ? "w-[89px]" : "w-[300px]"
            } overflow-hidden transition-all p-5 relative v-nav flex-col border-r-2 h-screen border-colorBorder gap-10 bg-sectionColor`}
        >
            {/* Logo */}
            <div className={` gap-2 logo flex items-center`}>
                <div className="flex items-center justify-center">
                    <div className="image w-10 h-10">
                        <img className="w-10 h-10" src="https://i.pinimg.com/564x/4b/74/67/4b74678fb3c9aafdbb1edac044e6017a.jpg" alt="logo" />
                    </div>
                    {!openMenu && (
                        <p className={`font-semibold text-base transition-opacity whitespace-nowrap duration-300 ${openMenu ? "opacity-0" : "opacity-100"}`}>Oilfield Gate</p>
                    )}
                </div>
            </div>
            {/* Navigation */}
            <nav className="py-6">
                <ul className="flex flex-col gap-20">
                    <div>
                        <p className={`text-sm font-semibold mb-2 transition-opacity whitespace-nowrap duration-300 ${openMenu ? "opacity-0" : "opacity-100"}`}>MENU</p>
                        {renderedMenuItems}
                    </div>
                    <div>
                        <p className={`text-sm font-semibold mb-2 transition-opacity duration-300 whitespace-nowrap ${openMenu ? "opacity-0" : "opacity-100"}`}>Account management</p>
                        <div
                            className={`${
                                openMenu ? "justify-center w-12" : "w-full" 
                            } cursor-pointer flex items-center h-12  gap-2 p-3 transition-all whitespace-nowrap text-colorText2 sm:text-base text-xs rounded-lg my-1 hover:bg-colorBorder`}
                         onClick={()=>{dispatch(openModal("LogOut"))}}>
                            <LogoutIcon fontSize="small" />
                            {!openMenu && <span>Log Out</span>}
                        </div>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default VerticalNavbar;