import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import IMAGES from "../../Images.js";
import HomepageImages from "../../HomepageImages";
import REVIEWS from "../../Reviews";
import { useState, useContext } from "react";
import { getWishlist, setWishlist } from "../../Wishlist";
import { UserContext } from "../../App";
import { getCheckoutList, setCheckoutList } from "../../CheckoutList";
import { Fade } from "react-awesome-reveal";

const Homepage = () => {
  const [isWishlistPopup, setIsWishlistPopup] = useState(false);
  const [wishlistItems, setWishlistItems] = useState(getWishlist);
  const { cartCount, setCartCount, cartList, setCartList } =
    useContext(UserContext);

  const [isAddToCartPopup, setIsAddToCartPopup] = useState(false);
  const [isEyePopup, setIsEyePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);

  const openEyePopup = (item) => {
    setSelectedItem(item);
    setIsEyePopup(true);
  };

  const closeEyePopup = () => {
    setIsEyePopup(false);
    setItemQuantity(1);
  };

  const navigate = useNavigate();

  const windowScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shopNow = () => {
    navigate("/Furniture-Ecommerce-Website/shop");
    windowScrollToTop();
  };

  const WishlistPopup = () => {
    setIsWishlistPopup(true);

    const timeoutID = setTimeout(() => {
      setIsWishlistPopup(false);
    }, 3000);
  };

  const addToWishlist = (item) => {
    setWishlistItems((wishlistItems) => {
      let updatedWishlistItems = [...wishlistItems];

      const isThere = updatedWishlistItems.find(
        (wishlistItem) => wishlistItem.id === item.id
      );

      if (!isThere) {
        updatedWishlistItems.push(item);
        WishlistPopup();
      } else {
        updatedWishlistItems = updatedWishlistItems.filter(
          (wishlistItem) => wishlistItem.id !== item.id
        );
      }
      setWishlist(updatedWishlistItems);
      console.log(updatedWishlistItems);
      return updatedWishlistItems;
    });
  };

  const isInWishlist = (item) => {
    return wishlistItems.find((wishlistItem) => wishlistItem.id === item.id);
  };

  const addToCartPopup = () => {
    setIsAddToCartPopup(true);

    const timeoutID = setTimeout(() => {
      setIsAddToCartPopup(false);
    }, 2000);
  };

  const handleIncreaseQuantity = () => {
    setItemQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setItemQuantity((prev) => prev + 1);
  };

  const addToShoppingCart = (item) => {
    setCartList((cartList) => {
      let updatedCheckoutList = [...cartList];

      const existingItem = updatedCheckoutList.find(
        (checkoutItem) => checkoutItem.id === item.id
      );

      if (existingItem) {
        // Item already in the cart, update its quantity
        existingItem.quantity += itemQuantity;
      } else {
        // Item not in the cart, add it with quantity 1
        const newItem = { ...item, quantity: itemQuantity };
        updatedCheckoutList.push(newItem);
      }
      // Update the cart count based on the total number of items in the cart
      const totalItemsInCart = updatedCheckoutList.reduce(
        (total, item) => total + item.quantity,
        0
      );

      addToCartPopup();
      setCartCount(totalItemsInCart);
      setCheckoutList(updatedCheckoutList);
      closeEyePopup();
      return updatedCheckoutList;
    });
  };
  const isInCart = (item) => {
    return cartList.find((checkoutItem) => checkoutItem.id === item.id);
  };

  return (
    <div className="homepage">
      {/* New Arrivals */}
      <div className="homepage-title">
        <div className="homepage-title-left">
          <motion.p
            className="para1"
            initial={{
              opacity: 0,
              translateX: -1000,
            }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            NEW ARRIVALS
          </motion.p>
          <motion.p
            className="para2"
            initial={{
              opacity: 0,
              translateX: -1000,
            }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            STINGRAY CHAIR
          </motion.p>
          <motion.p
            className="para3"
            initial={{
              opacity: 0,
              translateX: -1000,
            }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            Furniture can be made using a variety of woodworking joints which
            often<br></br>reflect the local culture.
          </motion.p>
          <motion.button
            className="shop-now-button"
            onClick={shopNow}
            initial={{
              opacity: 0,
              translateX: -1000,
            }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          >
            SHOP NOW
          </motion.button>
        </div>
        {HomepageImages.filter((item) => item.id === 1).map((item) => {
          return (
            <motion.div
              key={item.id}
              className="homepage-title-right"
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <img src={item.image} alt="" />
            </motion.div>
          );
        })}
      </div>
      <div className="new-arrivals">
        <Fade>
          <p className="new-arrivals-title">New Arrivals</p>
        </Fade>

        <p className="new-arrivals-description">
          When it comes to furnitures, choices are galore on Furvo
        </p>
        <div className="new-arrivals-display">
          {IMAGES.filter((item) => item.id >= 1 && item.id <= 8).map((item) => {
            return (
              <div key={item.id} className="card">
                <div>
                  <img src={item.image} className="card-img" />
                </div>
                <p className="card-info-1">{item.title}</p>
                <p className="card-info-2">SGD {item.price}</p>
                <div className="card-icons">
                  <div className="card-icons-1">
                    <button
                      className="add-to-wishlist"
                      onClick={() => addToWishlist(item)}
                    >
                      <i
                        style={{ color: isInWishlist(item) ? "red" : "black" }}
                        className={`fa ${
                          isInWishlist(item) ? "fas" : "far"
                        } fa-heart`}
                      ></i>
                    </button>
                  </div>
                  <div className="card-icons-2">
                    <button
                      className="preview"
                      onClick={() => openEyePopup(item)}
                    >
                      <i className="fa-regular fa-eye"></i>
                    </button>
                  </div>
                  <div className="card-icons-3">
                    <button
                      className="add-to-cart"
                      onClick={() => addToShoppingCart(item)}
                    >
                      <i
                        style={{ color: isInCart(item) ? "#FF7E03" : "black" }}
                        className="fa-solid fa-cart-shopping"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Best Sale */}
      <div className="best-sale">
        <Fade>
          <div className="best-sale-left">
            <p className="para1">BEST SALE PRODUCT</p>
            <p className="para2">Comfort Surround Chair</p>
            <button className="shop-now-button" onClick={shopNow}>
              SHOP NOW
            </button>
          </div>
        </Fade>

        {HomepageImages.filter((item) => item.id === 2).map((item) => {
          return (
            <div key={item.id} className="best-sale-right">
              <img src={item.image} alt="" />
            </div>
          );
        })}
      </div>

      {/* Popups */}
      {isWishlistPopup && (
        <div className="popup">
          <p>Item added to Wishlist</p>
          <button onClick={() => setIsWishlistPopup(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

      {/* Checkout Popup for middle button */}
      {isEyePopup && selectedItem && (
        <motion.div
          className="checkout-popup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="checkout-popup-img">
            <img src={selectedItem.image} alt="" />
          </div>
          <div className="checkout-popup-right">
            <div className="popup-title">
              <h1>{selectedItem.title}</h1>
            </div>
            <div className="popup-price">
              <p>SGD {selectedItem.price}</p>
            </div>
            <div className="popup-description">
              <p>{selectedItem.description}</p>
            </div>

            <div className="popup-add-to-cart">
              <div className="checkout-add-button">
                <button
                  className="add-button"
                  onClick={() => addToShoppingCart(selectedItem)}
                >
                  Add to cart
                </button>
              </div>
              <button className="close-button" onClick={closeEyePopup}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className="quantity-control">
                <button
                  className="decrease-button"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <span>{itemQuantity}</span>
                <button
                  className="increase-button"
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add to Cart Popup for right button*/}
      {isAddToCartPopup && (
        <div className="add-cart-popup">
          <p>Item added to Cart</p>
          <button onClick={() => setIsAddToCartPopup(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

      {/* Latest Reviews */}
      <div className="latest-reviews">
        <p className="latest-reviews-title">Latest Reviews</p>

        <p className="latest-reviews-description">
          Comments given by previous users
        </p>

        {/* Individual Reviews */}
        <div className="latest-reviews-display">
          {REVIEWS.map((item) => {
            return (
              <div key={item.id} className="individual-display">
                <div className="review-left">
                  <img src={item.img} alt="" />
                </div>
                <div className="review-right">
                  <div className="review">
                    <p className="review-name">
                      {item.name} {item.date}
                    </p>
                    <p>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                  </div>

                  <p className="review-description">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
