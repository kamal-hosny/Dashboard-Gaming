import React from 'react';
import '../../style/userStyle.css';
import { Button } from "@material-tailwind/react";
import { AnimatePresence, motion } from "framer-motion";

const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const Card = ({ user }) => {
    console.log(user);
    return (
        <AnimatePresence>
            <motion.div layout
                initial={{ transform: "scale(0.8)" }}
                animate={{ transform: "scale(1)" }}
                transition={{ type: "spring", damping: 8, stiffness: 50 }} 
                className='card w-[300px] rounded-lg overflow-hidden shadow'>
                <div className="head h-48 pattern relative">
                    <div className="image absolute left-1/2 overflow-hidden -bottom-12 rounded-full bg-sectionColor w-[120px] h-[120px] flex items-center justify-center -translate-x-1/2">
                        <img loading='lazy' className='h-[105px] w-[105px] rounded-full object-cover' src={user?.img?.url} alt={user?.img?.name} />
                    </div>
                </div>
                <div className="body bg-sectionColor flex justify-center flex-col pt-14 p-4 gap-6">
                    <div className="info text-base">
                        <p className='capitalize text-colorText1 font-semibold'>Name: {user?.username}</p>
                        <p className='text-colorText1 font-medium'>Email: {user?.email}</p>
                    </div>

                    <div className="btn flex items-end justify-between ">
                        <p className='capitalize text-colorText2 text-xs'>Joined {formatDate(user?.createdAt)}</p>

                        <div className="btn flex gap-1">
                            <Button className='bg-green-700 hover:bg-green-900 p-2 flex-1 rounded-sm flex' variant="filled">Profile</Button>
                            <Button className='bg-red-700 hover:bg-red-900 p-2 rounded-sm flex-1' variant="filled">Remove</Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default React.memo(Card);
