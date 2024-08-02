import { createContext, useState, useEffect, useMemo } from "react";

const AllStateContext = createContext({});

const AllStateProvider = ({ children }) => {
    const [openMenu, setOpenMenu] = useState(true);
    const [mobileSize, setMobileSize] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setMobileSize(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const changeMenuValue = () => {
        setOpenMenu(prevState => !prevState);
    };

    const contextValue = useMemo(() => ({
        openMenu,
        changeMenuValue,
        mobileSize
    }), [openMenu, mobileSize]);

    return (
        <AllStateContext.Provider value={contextValue}>
            {children}
        </AllStateContext.Provider>
    );
};

export { AllStateContext, AllStateProvider };