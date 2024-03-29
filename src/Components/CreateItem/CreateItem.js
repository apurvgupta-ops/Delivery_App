import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MdAttachMoney,
  MdCloudUpload,
  MdDelete,
  MdFastfood,
  MdFoodBank,
} from "react-icons/md";
import { categories } from "../../utils/Data";
import Loader from "../../Common/Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebase.config";
import { getAllFoodItems, saveItem } from "../../utils/FirebaseData";
import { useStateValue } from "../../Context/StateProvider";
import { actionType } from "../../Context/reducer";

const CreateItem = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMSg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    console.log(imageFile);
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    console.log(storageRef);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    console.log(uploadTask);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMSg("Error while uploading : Try Again");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMSg("Image Uploaded Successfully");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef)
      .then(() => {
        setImageAsset(null);
        setIsLoading(false);
        setFields(true);
        setMSg("Image deleted  successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
        setFields(true);
        setMSg("Error while deleting : Try again 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      });
  };
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if ((!title && !calories && !price && !imageAsset, !category)) {
        setFields(true);
        setMSg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };

        saveItem(data);

        setIsLoading(false);
        setFields(true);
        setMSg("Data uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);

        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMSg("Error while deleting : Try again 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };
  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCalories("Select Category");
  };

  const fetchData = () => {
    getAllFoodItems().then((data) => {
      console.log(data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
    <AnimatePresence>
      <div className="flex flex-col items-center justify-center">
        <div className="w-[80%] flex flex-col items-center justify-center p-2 border gap-4 border-gray-300 rounded-lg">
          {fields && (
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={`w-full p-2 rounded-lg text-center ${
                alertStatus === "danger"
                  ? "bg-red-500 text-red-900"
                  : " bg-emerald-400 text-emerald-800"
              }`}
            >
              {msg}
            </motion.p>
          )}

          <div className="w-full py-2 border-b border-gray-300 flex  items-center gap-2">
            <MdFastfood className="text-gray-700 text-xl" />
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give me a title"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"
            />
          </div>

          <div className="w-full">
            <select
              className="outline-none w-full text-base border-b-2 border-gray-300 p-2 rounded-lg cursor-pointer"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="other" className="bg-white">
                Select Category
              </option>
              {categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-black"
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-200 w-full h-96  cursor-pointer">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {!imageAsset ? (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center ">
                      <MdCloudUpload className="text-gray-500 group-hover:text-gray-700 text-3xl" />
                      <p className="text-gray-500 group-hover:text-gray-600">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                ) : (
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <button
                      className="absolute bottom-5 right-0 p-2 rounded-full bg-red-500 text-xl text-white cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="w-full flex flex-col md:flex-row items-center gap-3">
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdFoodBank className="text-gray-700 text-2xl" />
              <input
                type="text"
                required
                placeholder="Give me a Calories"
                className="w-full h-full text-lg bg-transparent outline-none order-none placeholder:text-gray-500"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </div>
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdAttachMoney className="text-gray-700 text-2xl" />
              <input
                type="text"
                required
                placeholder="Add the price..."
                className="w-full h-full text-lg  bg-transparent outline-none order-none placeholder:text-gray-500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full">
              <button
                type="button"
                className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
                onClick={saveDetails}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default CreateItem;
