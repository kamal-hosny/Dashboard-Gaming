import React from "react";
import { Select, Option } from "@material-tailwind/react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import TuneIcon from "@mui/icons-material/Tune";
import { useSelector } from "react-redux";

export function DrawerDefault({ statesValue, setStatesValue, categoriesValue, setCategoriesValue }) {
    const [open, setOpen] = React.useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const allStates = useSelector((state) => state);
    const valueStates = allStates?.allStates?.records?.data || [];

    const allCategories = useSelector((state) => state);
    const valueCategories = allCategories?.allCategories?.records?.data || [];


    const handleSelectChange = (val) => {
        setStatesValue(val);
    };

    const handleCategoriesChange = (val) => {
        setCategoriesValue(val);
    };

    console.log(statesValue ,categoriesValue);


    return (
        <React.Fragment>
            <Button onClick={openDrawer} className="rounded-e-full p-2 h-[42px]">
                Filters <TuneIcon />
            </Button>
            <Drawer open={open} onClose={closeDrawer} className="p-4 bg-sectionColor">
                <div className="mb-6 flex items-center justify-between ">
                    <Typography variant="h5" className="text-colorText1">
                        Filters
                    </Typography>
                    <IconButton
                        variant="text"
                        className="text-colorText2 hover:text-colorText1"
                        onClick={closeDrawer}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="w-full flex flex-col gap-6">
                        <Select
                            className="text-colorText1"
                            label="Select State"
                            value={statesValue}
                            onChange={handleSelectChange}
                        >
                            <Option value="">All</Option>
                            {valueStates?.map((x, index) => (
                                <Option key={index} value={x.attributes.name}>
                                    {x.attributes.name}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            className="text-colorText1"
                            label="Select Category"
                            value={categoriesValue}
                            onChange={handleCategoriesChange}
                        >
                            <Option value="">All</Option>
                            {valueCategories?.map((x, index) => (
                                <Option key={index} value={x.attributes.name}>
                                    {x.attributes.name}
                                </Option>
                            ))}

                        </Select>
                    </div>
                </div>
            </Drawer>
        </React.Fragment>
    );
}
