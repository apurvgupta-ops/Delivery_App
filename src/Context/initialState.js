import { FetchCart, FetchData } from "../utils/FetchLocalStorageData";

const userInfo = FetchData();
const cartInfo = FetchCart();
export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
  cartItems: cartInfo,
};
