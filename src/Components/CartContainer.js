import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItems from "./CartItems/CartItems";

const CartContainer = () => {
  const [{ user, cartItems, foodItems, total, cartShow }, dispatch] =
    useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };
  const ShowCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <div className="fixed top-[69px] right-0 w-full md:w-80 h-[91%] bg-slate-700 drop-shadow-md flex flex-col z-[101] rounded-2xl">
      {/* top */}
      <div
        className="w-full flex items-center justify-between p-4"
        onClick={ShowCart}
      >
        <MdOutlineKeyboardBackspace
          className="text-textColor text-3xl cursor-pointer"
          //   onClick={() => setCartMenu(false)}
        />
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <p
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </p>
      </div>
      {/* bottom */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {cartItems &&
              cartItems.map((item) => (
                <CartItems
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                $ {tot + 2.5}
              </p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-yellow-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-yellow-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </div>
  );
};

export default CartContainer;

// import React from "react";
// import { motion } from "framer-motion";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { RiRefreshFill } from "react-icons/ri";
// import { useStateValue } from "../Context/StateProvider";
// import { actionType } from "../Context/reducer";

// const CartContainer = () => {
//   const [{ cartShow }, dispatch] = useStateValue();
//   const ShowCart = () => {
//     dispatch({
//       type: actionType.SET_CART_SHOW,
//       cartShow: !cartShow,
//     });
//   };
//   return (
//     <div className="fixed top-[69px] right-0 w-full md:w-80 h-screen bg-white drop-shadow-md flex flex-col z-[101] ">
//       <div className="w-full flex items-center justify-between p-4 cursor-pointer">
//         <motion.div whileTap={{ scale: 0.75 }} onClick={ShowCart}>
//           <MdOutlineKeyboardBackspace className="text-3xl" />
//         </motion.div>
//         <p className="text-lg font-semibold">Cart</p>

//         <motion.p className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-200 rounded-md hover:shadow-md cursor-pointer text-base">
//           Clear <RiRefreshFill />
//         </motion.p>
//       </div>

//       <div className="w-full h-full rounded-t-[2rem] flex flex-col">
//         <div className="w-full h-[300px] md:h-44 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none "></div>

//         <div className="w-full p-1 px-2 rounded-lg items-center gap-2"></div>
//         <div className="w-full items-center justify-between">
//           <p className="text-gray-200 text-xl font-semibold">Total</p>
//           <p className="text-gray-200 text-xl font-semibold">340rs</p>
//         </div>

//         <motion.button className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-200 to-orange-600 text-gray-100 text-lg my-2 hover:shadow-lg">
//           CheckOut
//         </motion.button>
//       </div>
//     </div>
//   );
// };

// export default CartContainer;
