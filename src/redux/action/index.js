// For Add Item to Cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

// For Delete Item to Cart
export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};

// For add Wallet
export const addWallet = (wallet, network) => {
  return {
    type: "ADDWALLET",
    payload: { wallet, network },
  };
};

export const newWallet = (wallet) => {
  return {
    type: "NEWWALLET",
    payload: { wallet },
  };
};

// For remove Wallet
export const removeWallet = () => {
  return {
    type: "REMOVEWALLET",
  };
};
