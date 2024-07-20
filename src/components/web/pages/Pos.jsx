import {
  findAllProduct,
  findAllProductByCategoryProduct,
} from "@/api/ProductApi";
import { findAllProductCategory } from "@/api/ProductCategoryApi";
import React, { useEffect, useState } from "react";
import SwitcherThree from "../Switchers/SwitcherThree";
import { findAllDiscount } from "@/api/DiscountApi";
import { midtransPayment } from "@/api/PaymentGatewayApi";

const PosComponent = () => {
  const [productCategory, setProductCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedProductCategory, setSelectedProductCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);

  //promo switch
  const [switchPromoStatus, setSwitchPromoStatus] = useState(false);
  const [promo, setPromo] = useState([]);
  const [selectedPromo, setSelectedPromo] = useState("");

  const fetchProduct = async () => {
    try {
      let data;
      if (selectedProductCategory === "") {
        data = await findAllProduct();
      } else {
        data = await findAllProductByCategoryProduct(selectedProductCategory);
      }
      const updatedProducts = data.data.map((item) => ({
        ...item,
        quantity: cartItems.find((cartItem) => cartItem.id === item.id)
          ? cartItems.find((cartItem) => cartItem.id === item.id).quantity
          : 0,
      }));
      setProduct(updatedProducts);
    } catch (error) {
      console.error("(CLIENT) Error fetching products:", error);
    }
  };

  const fetchProductCategory = async () => {
    try {
      const categoryData = await findAllProductCategory();
      setProductCategory(categoryData.data);
    } catch (error) {
      console.error("(CLIENT) Error fetching product categories:", error);
    }
  };

  const fetchPromo = async () => {
    try {
      const discount = await findAllDiscount();
      setPromo(discount.data);
    } catch (error) {
      console.error("(CLIENT) Error fetching Discount:", error);
    }
  };

  useEffect(() => {
    fetchPromo();
    fetchProductCategory();
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [selectedProductCategory]);

  useEffect(() => {
    if (switchPromoStatus == false) {
      setSelectedPromo("");
    }
  }, [switchPromoStatus]);

  const addToCart = (productId) => {
    const existingItem = cartItems.find((item) => item.id === productId);
    const productToAdd = product.find((item) => item.id === productId);

    if (productToAdd) {
      if (existingItem) {
        if (existingItem.quantity < productToAdd.stock) {
          const updatedItems = cartItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          setCartItems(updatedItems);
        } else {
          console.log("Stok tidak cukup untuk produk ini.");
        }
      } else {
        const newCartItem = {
          ...productToAdd,
          quantity: 1,
        };
        setCartItems([...cartItems, newCartItem]);
      }
    }
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      return updatedCartItems.filter((item) => item.quantity > 0);
    });
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePayment = async () => {
    try {
      const payment = await midtransPayment("SADDASADADADssassssAds", cartItems);

      window.snap.pay(payment.token)
    } catch (error) {
      console.error("(CLIENT) Error Payment:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/4 lg:mr-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Menu</h3>
        </div>
        <div className="p-6.5">
          <select
            value={selectedProductCategory}
            onChange={(e) => setSelectedProductCategory(e.target.value)}
            className={`w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
          >
            <option value="" className="text-body dark:text-bodydark">
              Semua
            </option>
            {productCategory.map((item, index) => (
              <option
                key={index}
                value={item.id}
                className="text-body dark:text-bodydark"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-6.5">
          {product.map((item, index) => (
            <div key={index} className="border border-stroke p-4 bg-white">
              <div className="mb-4">
                {/* <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                /> */}
                <img
                  src="https://images.tokopedia.net/img/cache/700/VqbcmM/2022/3/26/91b7a6f5-2ce0-49e6-889f-58045d80c05f.jpg"
                  className="w-full h-40 object-cover"
                />
              </div>
              <h4 className="text-black dark:text-white">{item.name}</h4>
              <p className="text-primary">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(item.price)}
              </p>
              <p className="text-gray-600">Stok: {item.stock}</p>
              <button
                onClick={() => addToCart(item.id)}
                disabled={item.stock === 0}
                className={`mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition ${
                  item.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-1/4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h2 className="text-black dark:text-white">Cart Items</h2>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5 h-64 mb-3 overflow-y-auto">
          {cartItems.map((item, index) => (
            <div key={index} className="border border-stroke p-2 bg-white">
              <h4 className="text-black dark:text-white">{item.name}</h4>
              <p className="text-gray-500">Jumlah: {item.quantity}</p>
              <button onClick={() => handleDecreaseQuantity(item.id)}>
                Kurang 1
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between flex-col lg:flex-row px-6.5 py-4 dark:border-strokedark">
          <h2 className="text-black dark:text-white">Menggunakan Promo?</h2>
          <SwitcherThree setSwitchPromoStatus={setSwitchPromoStatus} />
        </div>
        {switchPromoStatus == true ? (
          <div className="p-6.5">
            <select
              value={selectedPromo}
              onChange={(e) => setSelectedPromo(e.target.value)}
              className={`w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
            >
              <option
                value=""
                selected
                disabled
                className="text-body dark:text-bodydark"
              >
                --Pilih Promo--
              </option>
              {promo.map((item, index) => (
                <option
                  key={index}
                  value={item.id}
                  className="text-body dark:text-bodydark"
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <div className="flex justify-between flex-col lg:flex-row px-6.5 py-4 dark:border-strokedark">
          <h2 className="text-black dark:text-white">Total: </h2>
          <h2 className="text-black dark:text-white">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(calculateTotal())}
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row px-6.5 py-4 dark:border-strokedark">
          <button
            className={`w-full mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition`}
            onClick={() => handlePayment()}
          >
            Bayar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default PosComponent;
