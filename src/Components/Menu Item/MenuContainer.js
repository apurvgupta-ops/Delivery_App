import React, { useEffect, useState } from "react";
import { categories } from "../../utils/Data";
import { MdFastfood } from "react-icons/md";
import { motion } from "framer-motion";
import Dishes from "../New Dishes/Dishes";
import { useStateValue } from "../../Context/StateProvider";
const MenuContainer = () => {
  const [filter, setFilter] = useState("Chicken");
  console.log(filter);
  const [{ foodItems }, dispatch] = useStateValue();
  console.log(foodItems);
  useEffect(() => {}, [filter]);
  return (
    <section className="w-full my-6 flex items-center justify-center ">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize transition-all ease-in-out duration-150 border-b-2 rounded-lg border-red-400">
          Our hot dishes
        </p>

        <div className="w-full flex items-center justify-center lg:justify-center gap-8 py-6 overflow-x-hidden scrollbar-none">
          {categories &&
            categories.map((item) => (
              <motion.div
                whileTap={{ scale: 0.9 }}
                key={item.id}
                className={`group ${
                  filter === item.name ? "bg-red-500" : "bg-white"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-red-400 `}
                onClick={() => setFilter(item.name)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === item.name ? "bg-white" : "bg-red-500"
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  <MdFastfood
                    className={`${
                      filter === item.name ? "text-gray-400" : "text-white"
                    }`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === item.name ? "text-white" : "text-black"
                  }group-hover:text-white`}
                >
                  {item.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <Dishes
            flag={false}
            data={foodItems?.filter((ele) => ele.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
