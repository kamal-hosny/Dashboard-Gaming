import React, { useState } from "react";
import { motion } from "framer-motion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountNav from "./AccountNav";

const AccountBar = () => {
    const [statusAccountNav, setStatusAccountNav] = useState(false);

    return (
        <div className="AccountBar relative">
            <div
                className="flex items-center gap-2 bg-sectionColorFocus hover:bg-sectionColorHover transition p-1 rounded-lg cursor-pointer"
                onClick={() => setStatusAccountNav(!statusAccountNav)}
            >
                <div className="image flex-shrink-0">
                    <img
                        className="w-10 h-10 rounded-lg shadow-md"
                        src="https://i.pinimg.com/474x/62/c4/e2/62c4e2cddb7184c7d11b33f3598c73ce.jpg"
                        alt="icon"
                    />
                </div>
                <div>
                    <div className="info w-[90px] hidden sm:block">
                        <p className="text-sm text-colorText1 font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                            Kamal hosny
                        </p>
                        <p className="text-colorText2 text-xs text-ellipsis overflow-hidden whitespace-nowrap">
                            admin 
                        </p>
                    </div>
                </div>
                <ArrowDropDownIcon />
            </div>
            {statusAccountNav && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-16 w-44 sm:w-full right-0 accountNavC"
                >
                    <AccountNav />
                </motion.div>
            )}
        </div>
    );
};

export default AccountBar;
