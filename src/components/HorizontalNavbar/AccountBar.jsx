import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountNav from "./AccountNav";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getOneUser } from "../../store/users/act/actGetOneUser";

const AccountBar = React.memo(() => {
    const dispatch = useDispatch();
    const Account = useMemo(() => {
        try {
            return JSON.parse(Cookies.get("auth"));
        } catch (e) {
            console.error("Failed to parse auth cookie:", e);
            return null;
        }
    }, []);

    useEffect(() => {
        if (Account?.user?.id) {
            dispatch(getOneUser(Account.user.id));
        }
    }, [dispatch, Account]);

    const [statusAccountNav, setStatusAccountNav] = useState(false);
    const toggleAccountNav = useCallback(
        () => setStatusAccountNav((prev) => !prev),
        []
    );

    const { record } = useSelector((state) => state?.getAllUsers);
    console.log(record);

    return (
        <div className="AccountBar relative">
            <div
                className="flex items-center gap-2 bg-sectionColorFocus hover:bg-sectionColorHover transition p-1 rounded-lg cursor-pointer"
                onClick={toggleAccountNav}
            >
                <div className="image flex-shrink-0">
                    <img
                        className="w-10 h-10 rounded-lg shadow-md"
                        src={record?.img?.url}
                        alt={record?.img?.name || "User Avatar"}
                    />
                </div>
                <div>
                    <div className="info w-[90px] hidden sm:block">
                        <p className="text-sm text-colorText1 font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                            {record?.username}
                        </p>
                        <p className="text-colorText2 text-xs text-ellipsis overflow-hidden whitespace-nowrap">
                            {record?.role?.name}
                        </p>
                    </div>
                </div>
                <span className="text-colorText2"><ArrowDropDownIcon /></span>
            </div>
            {statusAccountNav && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-16 w-44 sm:w-full z-10 right-0 accountNavC"
                >
                    <AccountNav />
                </motion.div>
            )}
        </div>
    );
});

export default AccountBar;
