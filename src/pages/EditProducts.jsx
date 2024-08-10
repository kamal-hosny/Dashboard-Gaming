import React, { useState, useEffect, memo, useContext } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllStates } from "../store/states/act/actGetAllStates";
import { getAllCategories } from "../store/category/act/actGetAllCategories";
import { getOneProduct } from "../store/products/act/actGetOneProduct";
import { editProduct } from "../store/products/act/actEditProduct";
import { useNavigate, useParams } from "react-router-dom";
import  gameNotFound  from "../assets/game-not-found.jpeg"
import { AllStateContext } from "../context/AllStateContext";
import { cleanRecord } from "../store/products/productsSlice";


const EditProducts = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch();

  const { mobileSize, openMenu } = useContext(AllStateContext);

  // Fetch all states and categories
  useEffect(() => {
    dispatch(getAllStates());
    dispatch(getAllCategories());
  }, [dispatch]);

  const {
    records: stateRecords = { data: [] },
    loading: loadingStates,
    error: errorStates,
  } = useSelector((state) => state.allStates || {});
  const [statesData, setStatesData] = useState([]);

  useEffect(() => {
    if (stateRecords.data) {
      setStatesData(stateRecords.data);
    }
  }, [stateRecords]);

  const {
    records: categoryRecords = { data: [] },
    loading: loadingCategories,
    error: errorCategories,
  } = useSelector((state) => state.allCategories || {});
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    if (categoryRecords.data) {
      setCategoriesData(categoryRecords.data);
    }
  }, [categoryRecords]);

  // Fetch one product
  useEffect(() => {
    if (id) {
      dispatch(getOneProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(cleanRecord())
  }, [dispatch])


  const { record } = useSelector((state) => state.allProducts);

  // Initialize form
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [preview, setPreview] = useState(null);
  const [previewBanner, setPreviewBanner] = useState(null);

  useEffect(() => {
    if (record?.data?.attributes) {
      const productData = record.data.attributes;
      // const systemRequirements = productData.systemRequirements || {};
      reset({
        name: productData.name,
        price: productData.price,
        img: productData?.img?.data?.attributes.url ,
        mainImg: productData?.mainImg?.data?.attributes.url ,
        review: productData.review,
        sale: productData.sale,
        details: productData.details,
        developer: productData.developer,
        releaseDate: productData.releaseDate ? formatDate(productData.releaseDate) : '',
        os: productData.systemRequirements.os || "" ,
        memory: productData.systemRequirements.memory || "" ,
        storage: productData.systemRequirements.storage || "" ,
        graphics: productData.systemRequirements.graphics || "" ,
        processor: productData.systemRequirements.processor || "" ,
        states: productData.states?.data.map(state => state.id) || [],
        categories: productData.categories?.data.map(category => category.id) || [],
      });
      setPreview(productData?.img?.data?.attributes.url || gameNotFound)
      setPreviewBanner(productData?.mainImg?.data?.attributes.url || gameNotFound)
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

    // Handle main image
    if (data.mainImg[0]) formData.append("mainImg", data.mainImg[0]);

    // Handle cover image
    if (data.img[0]) formData.append("img", data.img[0]);

    // Add other fields
    Object.keys(data).forEach((key) => {
      if (key === "systemRequirements") {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key !== "img" && key !== "mainImg") {
        formData.append(key, data[key]);
      }
    });

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
        navigate("/products")
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

  const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewBanner(previewUrl);
    }
  };

  // Clean up preview URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      if (previewBanner) {
        URL.revokeObjectURL(previewBanner);
      }
    };
  }, [preview, previewBanner]);


  return (
    <div className={`${!mobileSize && !openMenu && (" pl-10 ")}`}>
    <h2 className="main-title  text-colorText1">Edit Product</h2>
    <form
      className="py-4 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="xl:flex-row flex-col flex justify-between flex-wrap w-full items-start gap-3">
        <div className="input-textXX flex flex-col gap-4 flex-wrap">
          <div className=" grid grid-cols-6 gap-2 bg-sectionColor w-full p-3 rounded-md border-2 border-colorBorder shadow flex-1">
            {/* System Requirements */}
            <div className="py-2 font-semibold text-colorText1 text-center col-span-6">
              Product Information
            </div>
            {/* Name */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Name:</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Review */}
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
              {errors.review && (
                <span className="text-red-500">{errors.review.message}</span>
              )}
            </div>
            {/* Price */}
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-colorText1">Price:</label>
              <input
                type="number"
                {...register("price", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.price && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Sale */}
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-colorText1">Sale:</label>
              <input
                type="number"
                {...register("sale", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.sale && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Developer */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Developer:</label>
              <input
                type="text"
                {...register("developer", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.developer && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Release Date */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Release Date:</label>
              <input
                type="date"
                {...register("releaseDate", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.releaseDate && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* State */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">State:</label>
              <select
                {...register("state", { required: true })}
                className="border-colorBorder border-2 p-2 h-[42.91px] w-full focus:outline-mainColorHover"
              >
                {statesData?.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state?.attributes?.name}
                  </option>
                ))}
              </select>
              {errors.state && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Category */}
            <div className="flex flex-col gap-1 col-span-3">
              <label className="text-colorText1">Category:</label>
              <select
                {...register("category", { required: true })}
                className="border-colorBorder border-2 p-2 h-[42.91px] w-full focus:outline-mainColorHover"
              >
                {categoriesData?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category?.attributes?.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Details */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Details:</label>
              <textarea
                {...register("details", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.details && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2 bg-sectionColor w-full p-3 rounded-md border-2 border-colorBorder shadow flex-1">
            {/* System Requirements */}
            <div className="py-2 font-semibold text-colorText1 text-center col-span-6">
              System Requirements
            </div>
            {/* OS */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">OS:</label>
              <input
                type="text"
                {...register("os", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.systemRequirements?.os && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Processor */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Processor:</label>
              <input
                type="text"
                {...register("processor", {
                  required: true,
                })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.systemRequirements?.processor && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Memory */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Memory:</label>
              <input
                type="text"
                {...register("memory", { required: true })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.systemRequirements?.memory && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Graphics */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Graphics:</label>
              <input
                type="text"
                {...register("graphics", {
                  required: true,
                })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.systemRequirements?.graphics && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* Storage */}
            <div className="flex flex-col gap-1 col-span-6">
              <label className="text-colorText1">Storage:</label>
              <input
                type="text"
                {...register("storage", {
                  required: true,
                })}
                className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
              />
              {errors.systemRequirements?.storage && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-col justify-center">
          <div className="flex-1 flex flex-col w-full gap-4">
            <label
              htmlFor="bannerFile"
              className="cursor-pointer bg-sectionColor w-full flex rounded-md border-2 h-[300px] border-colorBorder shadow justify-center items-center"
            >
              {previewBanner ? (
                <div className="images relative w-full h-full">
                  <img
                    className="rounded-md w-full h-full object-cover"
                    src={previewBanner}
                    alt="previewBanner"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1">
                  <svg
                    viewBox="0 0 640 512"
                    className="h-12 fill-gray-700 mb-5"
                  >
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                  </svg>
                  <p className="text-colorText2">Drag and Drop</p>
                  <p className="text-colorText2">or</p>
                  <span className="bg-gray-700 text-white px-4 py-1 rounded-lg transition-all duration-300 hover:bg-black">
                    Upload Banner Image
                  </span>
                </div>
              )}
              <input
                id="bannerFile"
                type="file"
                className="hidden"
                {...register("mainImg", {
                  required: false,
                  onChange: handleBannerUpload,
                })}
              />
            </label>
          </div>

          <div className="flex-1 flex flex-col w-full gap-4">
            <label
              htmlFor="coverFile"
              className="cursor-pointer bg-sectionColor flex rounded-md border-2 w-[300px] h-[300px] border-colorBorder shadow justify-center items-center"
            >
              {preview ? (
                <div className="images relative w-full h-full">
                  <img
                    className="rounded-md w-full h-full object-cover"
                    src={preview}
                    alt="Preview"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1">
                  <svg
                    viewBox="0 0 640 512"
                    className="h-12 fill-gray-700 mb-5"
                  >
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                  </svg>
                  <p className="text-colorText2">Drag and Drop</p>
                  <p className="text-colorText2">or</p>
                  <span className="bg-gray-700 text-white px-4 py-1 rounded-lg transition-all duration-300 hover:bg-black">
                    Upload Cover Image
                  </span>
                </div>
              )}
              <input
                id="coverFile"
                type="file"
                className="hidden"
                {...register("img", {
                  required: false,
                  onChange: handleImageUpload,
                })}
              />
            </label>
          </div>
        </div>
      </div>
      <button
        className="bg-mainColor hover:bg-mainColorHover transition p-2 font-semibold text-white w-24 self-end rounded-md cursor-pointer"
        type="submit"
      >
        Create
      </button>
    </form>
  </div>
  );
};

export default memo(EditProducts);
