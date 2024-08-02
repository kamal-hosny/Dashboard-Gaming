import React, { useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationNav from "./NotificationNav";
import { motion, AnimatePresence } from "framer-motion";

const NotificationBar = () => {
  const [statusNotificationNav, setStatusNotificationNav] = useState(false);
  return (
    <div className={`notification-bar sm:relative `}>
      <div
        className="bg-sectionColorFocus hover:bg-sectionColorHover transition p-3 rounded-lg relative cursor-pointer"
        onClick={() => setStatusNotificationNav(!statusNotificationNav)}
      >
        <NotificationsNoneOutlinedIcon />
        <span className="absolute bg-red-600 border border-colorBorder h-2 w-2 top-4 right-3 rounded-full"></span>
      </div>
      <AnimatePresence>
        {statusNotificationNav && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute sm:top-16 top-20 w-64 right-0 notificationNavC"
          >
            <NotificationNav setNotNav={setStatusNotificationNav} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBar;
