import React from "react";
import { Select, Option } from "@material-tailwind/react";

import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import TuneIcon from "@mui/icons-material/Tune";
export function DrawerDefault({ statesValue, setStatesValue }) {
    const [open, setOpen] = React.useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return (
        <React.Fragment>
            <Button onClick={openDrawer} className="rounded-e-full p-2 h-[42px]">
                Filters <TuneIcon />
            </Button>
            <Drawer open={open} onClose={closeDrawer} className="p-4 bg-sectionColor">
                <div className="mb-6 flex items-center justify-between ">
                    <Typography variant="h5" className="text-colorText1" >
                        Filters
                    </Typography>
                    <IconButton variant="text" className="text-colorText2 hover:text-colorText1" onClick={closeDrawer}>
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
                    <div>
                        <div className="w-full">
                            <Select
                                className="text-colorText1"
                                label="Select States"
                                value={statesValue}
                                onChange={(val) => setStatesValue(val)}
                            >
                                <Option value="">ِAll</Option>
                                <Option value="coming soon">coming soon</Option>
                                <Option value="most played">most played</Option>
                                <Option value="most popular">most popular</Option>
                                <Option value="top news">top news</Option>
                                <Option value="top sellers">top sellers</Option>
                                <Option value="trending">trending</Option>
                            </Select>
                        </div>
                    </div>
                    <div></div>
                </div>
            </Drawer>
        </React.Fragment>
    );
}
