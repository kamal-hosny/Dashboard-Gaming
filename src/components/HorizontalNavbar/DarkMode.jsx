import React, { useEffect, useState } from "react";

import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";

const DarkMode = () => {
    const [darkTheme, setDarkTheme] = useState(
        localStorage.getItem("currentDarkMode") ?? "light"
    );

    useEffect(() => {
        if (darkTheme === "light") {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
        }
    }, [darkTheme]);

    return (
        <div
            className="darkMode"
            onClick={() => {
                // set value to localStorage
                localStorage.setItem(
                    "currentDarkMode",
                    darkTheme === "dark" ? "light" : "dark"
                );
                // get value from localStorage
                setDarkTheme(localStorage.getItem("currentDarkMode"));
            }}
        >
            <div className="flex items-center gap-2 bg-sectionColorFocus hover:bg-sectionColorHover transition p-3 rounded-lg cursor-pointer text-colorText2">
                {darkTheme === "dark" ? <LightModeIcon /> : <NightsStayIcon />}
            </div>
        </div>
    );
};

export default DarkMode;
