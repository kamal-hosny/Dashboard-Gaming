import React, { memo } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';

const notifications = [
  {
    id: 1,
    imageUrl: "https://i.pinimg.com/736x/31/aa/7f/31aa7fa8c4f6a90b14f2c42737377e55.jpg",
    message: "Request for Information: New Project Details Required.",
    time: "1m ago"
  },
  {
    id: 2,
    imageUrl: "https://i.pinimg.com/736x/2f/2c/6c/2f2c6c9b0c0592575dbab0c4583b73c7.jpg",
    message: "Request for Information: Update your contact info.",
    time: "5m ago"
  },
  {
    id: 3,
    imageUrl: "https://i.pinimg.com/564x/e0/f2/f8/e0f2f88f9ddd12a8284218b784e587d9.jpg",
    message: "Request for Information: Update your contact info.",
    time: "10m ago"
  },
];

const NotificationNav = ({ setNotNav }) => {
  return (
    <div className="accountNav bg-sectionColor border-2 p-3 border-colorBorder rounded-lg">
      <div className='flex justify-between pt-[6px] px-1 pb-4 border-b-2'>
        <p className='text-sm font-semibold'>Notifications</p>
        <NavLink
          to="notification"
          onClick={() => setNotNav(prev => !prev)}
          className='hover:-rotate-45 transition duration-300 flex justify-center items-center'
        >
          <SettingsIcon fontSize='small' style={{ cursor: "pointer" }} />
        </NavLink>
      </div>
      <ul className="flex flex-col gap-3 mt-3">
        {notifications.map(({ id, imageUrl, message, time }) => (
          <NotificationItem
            key={id}
            imageUrl={imageUrl}
            message={message}
            time={time}
          />
        ))}
      </ul>
    </div>
  );
};

const NotificationItem = memo(({ imageUrl, message, time }) => (
  <li className='flex gap-2 cursor-pointer hover:bg-[#f2f2f2] p-1.5 rounded-lg'>
    <div className="nicon flex-shrink-0 w-10 h-10">
      <img className='w-10 h-10 object-cover rounded-lg' src={imageUrl} alt="" />
    </div>
    <div className="info text-xs flex-1 flex flex-col gap-1">
      <p className='font-semibold'>{message}</p>
      <div className="time text-[#9b9ca0]">
        {time}
      </div>
    </div>
  </li>
));

export default NotificationNav;
