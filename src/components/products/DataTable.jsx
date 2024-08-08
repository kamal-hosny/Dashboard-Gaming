import React, { memo, useState, useEffect } from 'react';
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { openModal } from '../../store/modal/modalSlice';
import { useDispatch } from 'react-redux';

const apiUrl = import.meta.env.VITE_API_URL;

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleString(undefined, options);
};

const DataTable = ({ data }) => {
  const dispatch = useDispatch()
  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    if (data?.data) {
      const formattedData = data.data.map(item => ({
        id: item.id,
        name: item.attributes.name,
        review: item.attributes.review,
        price: item.attributes.price,
        sale: item.attributes.sale,
        category: item.attributes.category,
        developer: item.attributes.developer,
        releaseDate: formatDate(item.attributes.releaseDate),
        img: item.attributes.img?.data?.attributes?.url,
      }));
      setGamesData(formattedData);
    }
  }, [data]);

  return (
    <div className="flex flex-col w-full relative">
      <div className="overflow-x-auto absolute w-full z-2">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border border-colorText2 rounded-sm">
            <table className="min-w-full divide-y divide-colorText2">
              <thead className="text-colorText2 text-xs font-medium">
                <tr>
                  <th scope="col" className="px-6 py-3 text-start">ID</th>
                  <th scope="col" className="px-6 py-3 text-start">Name</th>
                  <th scope="col" className="px-6 py-3 text-start">Image</th>
                  <th scope="col" className="px-6 py-3 text-start">Review</th>
                  <th scope="col" className="px-6 py-3 text-start">Price</th>
                  <th scope="col" className="px-6 py-3 text-start">Sale</th>
                  <th scope="col" className="px-6 py-3 text-start">Developer</th>
                  <th scope="col" className="px-6 py-3 text-start">Release Date</th>
                  <th scope="col" className="px-6 py-3 text-start">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-colorText2 text-colorText1">
                {gamesData.map((game, index) => (
                  <tr key={game.id} className="hover:bg-sectionColorHover">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{game.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <img
                        src={game.img ? `${game.img}` : "https://i.pinimg.com/236x/65/7e/7b/657e7b0379577a578338c70bbacea125.jpg"}
                        alt={game.name}
                        className="w-10 h-10 object-cover inline-block mr-2"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Rating name="half-rating-read" defaultValue={game.review} precision={0.5} readOnly />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">${game.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">${game.sale}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{game.developer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{game.releaseDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`edit/${game.id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-500 mr-2">Edit</Link>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-500" onClick={() => { dispatch(openModal({name:"Deleteproduct", id:game.id})) }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DataTable);
