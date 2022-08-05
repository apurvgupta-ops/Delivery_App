export const FetchData = () => {
  const userInfo = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : localStorage.clear();

  return userInfo;
};

export const FetchCart = () => {
  const CartInfo = localStorage.getItem("Cart")
    ? localStorage.getItem("Cart")
    : localStorage.clear();

  return CartInfo ? CartInfo : [];
};
