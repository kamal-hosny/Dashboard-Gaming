import React, { useState, useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllStates } from "../store/states/act/actGetAllStates";
import { getAllCategories } from "../store/category/act/actGetAllCategories";
import { getOneProduct } from "../store/products/act/actGetOneProduct";
import { editProduct } from "../store/products/act/actEditProduct";
import { useParams } from "react-router-dom";

const EditProducts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch all states and categories
  useEffect(() => {
    dispatch(getAllStates());
    dispatch(getAllCategories());
  }, [dispatch]);

  const stateRecords = useSelector((state) => state.allStates.records?.data || []);
  const categoryRecords = useSelector((state) => state.allCategories.records?.data || []);

  // Fetch one product
  useEffect(() => {
    if (id) {
      dispatch(getOneProduct(id));
    }
  }, [dispatch, id]);

  const { record } = useSelector((state) => state.allProducts);

  // Initialize form
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (record?.data?.attributes) {
      const productData = record.data.attributes;
      const systemRequirements = productData.systemRequirements || {};
      reset({
        name: productData.name,
        price: productData.price,
        review: productData.review,
        sale: productData.sale,
        details: productData.details,
        developer: productData.developer,
        releaseDate: productData.releaseDate ? formatDate(productData.releaseDate) : '',
        os: systemRequirements.os || '',
        memory: systemRequirements.memory || '',
        storage: systemRequirements.storage || '',
        graphics: systemRequirements.graphics || '',
        processor: systemRequirements.processor || '',
        states: productData.states?.data.map(state => state.id) || [],
        categories: productData.categories?.data.map(category => category.id) || [],
      });
    }
  }, [record, reset]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    if (data.img && data.img[0]) {
      formData.append("img", data.img[0]);
    }

    const productData = {
      data: {
        id: id,
        name: data.name,
        price: parseFloat(data.price),
        review: parseInt(data.review),
        sale: parseFloat(data.sale),
        details: data.details,
        developer: data.developer,
        releaseDate: data.releaseDate,
        systemRequirements: {
          os: data.os,
          memory: data.memory,
          storage: data.storage,
          graphics: data.graphics,
          processor: data.processor
        },
        states: data.states.map(stateId => ({ id: parseInt(stateId) })),
        categories: data.categories.map(categoryId => ({ id: parseInt(categoryId) }))
      }
    };

    dispatch(editProduct(productData))
      .then(() => {
        reset();
        console.log("Success!");
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    console.log(data);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div>
      <h2>Edit Product</h2>
      <form className="py-4 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex-row flex-col flex justify-between w-full items-start gap-3">
          <div className="grid grid-cols-6 gap-2 bg-sectionColor w-full p-3 rounded-md border-2 border-colorBorder shadow flex-1">
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Name:</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.name && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-colorText1">Review:</label>
              <input
                type="number"
                min="0"
                max="5"
                {...register("review", {
                  required: "This field is required",
                  min: { value: 0, message: "Value must be at least 0" },
                  max: { value: 5, message: "Value must be at most 5" },
                })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.review && <span className="text-red-500">{errors.review.message}</span>}
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-colorText1">Price:</label>
              <input
                type="number"
                {...register("price", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.price && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-colorText1">Sale:</label>
              <input
                type="number"
                {...register("sale", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.sale && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Developer:</label>
              <input
                type="text"
                {...register("developer", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.developer && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Release Date:</label>
              <input
                type="date"
                {...register("releaseDate", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.releaseDate && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">State:</label>
              <select
                {...register("state", { required: true })}
                className="border-colorBorder border-2 p-2 h-[42.91px] w-full focus:outline-mainColorHover"
              >
                {stateRecords.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state?.attributes?.name}
                  </option>
                ))}
              </select>
              {errors.state && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Category:</label>
              <select
                {...register("category", { required: true })}
                className="border-colorBorder border-2 p-2 h-[42.91px] w-full focus:outline-mainColorHover"
              >
                {categoryRecords.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category?.attributes?.name}
                  </option>
                ))}
              </select>
              {errors.category && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Details:</label>
              <textarea
                {...register("details", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              ></textarea>
              {errors.details && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Image:</label>
              <input
                type="file"
                accept="image/*"
                {...register("img")}
                onChange={handleImageUpload}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {preview && <img src={preview} alt="Preview" className="mt-2 max-w-xs" />}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2 bg-sectionColor w-full p-3 rounded-md border-2 border-colorBorder shadow flex-1">
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">OS:</label>
              <input
                type="text"
                {...register("os", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.os && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Memory:</label>
              <input
                type="text"
                {...register("memory", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.memory && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Storage:</label>
              <input
                type="text"
                {...register("storage", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.storage && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Graphics:</label>
              <input
                type="text"
                {...register("graphics", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.graphics && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Processor:</label>
              <input
                type="text"
                {...register("processor", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.processor && <span className="text-red-500">This field is required</span>}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-mainColor p-2 rounded text-white hover:bg-mainColorHover">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(EditProducts);
