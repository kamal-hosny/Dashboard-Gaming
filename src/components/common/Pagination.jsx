import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination({ pageNumber, setPageNumber, pagination }) {

    console.log(pagination);
    const next = () => {
        if (pageNumber === pagination?.pageCount) return;
        setPageNumber(pageNumber + 1);
    };

    const prev = () => {
        if (pageNumber === 1) return;
        setPageNumber(pageNumber - 1);
    };

    return (
        <div className="flex items-center gap-4">
            <IconButton
            className="text-colorText1 border-colorText2"
                size="sm"
                variant="outlined"
                onClick={prev}
                disabled={pageNumber === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography color="gray" className="font-normal text-colorText2">
                Page <strong className="text-colorText1">{pageNumber}</strong> of{" "}
                <strong className="text-colorText1">{pagination?.pageCount}</strong>
            </Typography>
            <IconButton
            className="text-colorText1 border-colorText2"
                size="sm"
                variant="outlined"
                onClick={next}
                disabled={pageNumber === pagination?.pageCount}
            >
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
        </div>
    );
}