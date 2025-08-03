import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import { addWallet, removeWallet, newWallet } from "../redux/action";

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const walletState = useSelector((state) => state.handleWallet);
  const dispatch = useDispatch();

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    initializeProvider();
  };

  const initializeProvider = async () => {
    const newProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = newProvider.getSigner();
    const address = await signer.getAddress();
    const network = await newProvider.getNetwork();

    dispatch(addWallet(address, network.chainId));
  };

  const disconnectWallet = () => {
    dispatch(removeWallet());
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", ([newAccount]) => {
        dispatch(newWallet(newAccount));
      });

      window.ethereum.on("chainChanged", () => {
        // graceful handling: re-init everything
        initializeProvider();
      });
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          {" "}
          React Ecommerce
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="buttons text-center">
            <NavLink to="/login" className="btn btn-outline-dark m-2">
              <i className="fa fa-sign-in-alt mr-1"></i> Login
            </NavLink>
            <NavLink to="/register" className="btn btn-outline-dark m-2">
              <i className="fa fa-user-plus mr-1"></i> Register
            </NavLink>
            <NavLink to="/cart" className="btn btn-outline-dark m-2">
              <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}){" "}
            </NavLink>
            <div>
              {walletState.wallet ? (
                <div>
                  <p>
                    Connected: {walletState.wallet.slice(0, 6)}...
                    {walletState.wallet.slice(-4)}
                  </p>
                  <p>Network: {walletState.network}</p>
                  <button onClick={() => disconnectWallet()}>Disconnect</button>
                </div>
              ) : (
                <button onClick={() => connectWallet()}>Connect Wallet</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
