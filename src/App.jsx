import React from "react";
import "./App.css";
import Header from "./Header";
import Products from "./Products";
import { Route, Routes } from "react-router-dom";
import Details from "./Details.class";
import Cart from "./Cart";
import Checkout from "./Checkout.class";
import { useCartContext } from "./cartContext";

export default function App() {
  const { dispatch } = useCartContext();
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<h1>Helllo! Welcome to Carved Rock Fitness!</h1>} />
            <Route path='/:category' element={<Products />} />
            <Route path='/:category/:id' element={<Details />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout dispatch={ dispatch } />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
