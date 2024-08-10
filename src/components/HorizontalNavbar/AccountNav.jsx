import React from "react";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modal/modalSlice";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

const AccountNavItem = () => [
    {
        title: "Profile",
        icon: <PersonIcon/>,
        link: "/profile"
    },
    {
        title: "Settings",
        icon: <SettingsIcon/>,
        link: "/settings"
    },
];

const ListItem = ({ item }) => (
    <Link to={item.link}>
        <li className="flex items-center gap-2 cursor-pointer p-3 text-colorText2 hover:bg-sectionColorHover rounded-lg">
            {item.icon}
            <span className="whitespace-nowrap overflow-hidden text-sm font-medium">
                {item.title}
            </span>
        </li>
    </Link>
);

const AccountNav = () => {
    const dispatch = useDispatch();

    // Fetch the navigation items
    const navItems = AccountNavItem();

    return (
        <div className="accountNav bg-sectionColor border-2 border-colorBorder p-1 rounded-lg">
            <ul className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                    <ListItem key={index} item={item} />
                ))}
                <li
                    className="flex items-center gap-2 cursor-pointer p-3 text-colorText2 hover:bg-sectionColorHover rounded-lg"
                    onClick={() => {
                        dispatch(openModal({ name: "LogOut" }));
                    }}
                >
                    <LogoutIcon />
                    <span className="whitespace-nowrap overflow-hidden text-sm font-medium">
                        Log out
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default AccountNav;
