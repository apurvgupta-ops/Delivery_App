import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HomeContainer from "../HomeContainer";
import { useStateValue } from "../../Context/StateProvider";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Dishes from "../New Dishes/Dishes";
import MenuContainer from "../Menu Item/MenuContainer";
import CartContainer from "../CartContainer";

const MainContainer = () => {
  const [{ cartShow, foodItems }, dispatch] = useStateValue();
  // console.log(foodItems);
  const [scrollView, setScrollView] = useState(0);
  useEffect(() => {}, [scrollView, cartShow]);
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full my-6 ">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize transition-all ease-in-out duration-150 border-b-2 rounded-lg border-red-400">
            Our Fresh & healthy fruits
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollView(-200)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollView(200)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <Dishes
          scrollView={scrollView}
          flag={true}
          data={foodItems?.filter((n) => n.category === "Chicken")}
        />
      </section>
      <MenuContainer />
      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
