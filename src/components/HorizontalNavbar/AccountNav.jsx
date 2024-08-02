import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const AccountNavItem = [
    {
        title: "Log out",
        icon: <LogoutIcon />,
        path: null,
    },
];


const ListItemWithLink = ({ item }) => (
    <li className="cursor-pointer px-3 py-3 hover:bg-sectionColorHover text-colorText2 rounded-lg">
        <Link to={item.path} className="flex items-center gap-2">
            {item.icon}
            <span className="whitespace-nowrap overflow-hidden text-sm font-medium">{item.title}</span>
        </Link>
    </li>
);

const ListItemWithoutLink = ({ item }) => (
    <li className="flex items-center gap-2 cursor-pointer p-3 text-colorText2 hover:bg-sectionColorHover rounded-lg ">
        {item.icon}
        <span className="whitespace-nowrap overflow-hidden text-sm font-medium">{item.title}</span>
    </li>
);

const AccountNav = () => {
    const renderedAccountNavItem = useMemo(() => {
        return AccountNavItem.map((item, index) => {
            return item.path ? (
                <ListItemWithLink key={index} item={item} />
            ) : (
                <ListItemWithoutLink key={index} item={item} />
            );
        });
    }, []);

    return (
        <div className="accountNav bg-sectionColor border-2 border-colorBorder  p-1 rounded-lg">
            <ul className="flex flex-col gap-1">{renderedAccountNavItem}</ul>
        </div>
    );
};

export default AccountNav;
