// Possibility to retrieve initial state from localStorage
const getWallet = () => {
  const wallet = null;
  const network = null;
  return { wallet, network };
};

const handleWallet = (state = getWallet(), action) => {
  switch (action.type) {
    case "ADDWALLET":
      return {
        ...state,
        wallet: action.payload.wallet,
        network: action.payload.network,
      };

    case "NEWWALLET":
      return {
        ...state,
        wallet: action.payload.wallet,
      };

    case "REMOVEWALLET":
      return {
        ...state,
        wallet: null,
        network: null,
      };

    default:
      return state;
  }
};

export default handleWallet;
