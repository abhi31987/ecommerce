// Navbar.js
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faBell,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import nasalogo from "../Assets/nasalogo.png";
import "./Navbar.css";
import axios from "axios";
import { CartContext } from "./CreateContext";
import useAuth from "../Auth2/useAuth";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { user } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
    toggleDropdown();
    // Navigate to the products page with the selected category
    navigate(`/products/category/${category}`);
  };
  
  

  useEffect(() => {
    fetchProductsByCategory();
  }, [categoryFilter]);

  const fetchProductsByCategory = () => {
    if (categoryFilter !== null) {
      axios
        .get(`http://localhost:5555/api/products?category=${categoryFilter}`)
        .then((response) => {
          console.log(
            `Products fetched for category ${categoryFilter}:`,
            response.data
          );
        })
        .catch((error) => {
          console.error(
            `Error fetching products for category ${categoryFilter}:`,
            error
          );
        });
    }
  };

  return (
    <nav className={`navbar ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="container">
        <div className="left-side">
          <div className="logo">
          E-Commerce
          </div>
          <ul className={`nav-items ${isMenuOpen ? "show" : ""}`}>
            <Link to="/">
              <li className="nav-item">Home</li>
            </Link>
            <li
              className={`nav-item categories ${showDropdown ? "active" : ""}`}
              onClick={toggleDropdown}
            >
              <span>Categories</span>
              {showDropdown && (
                <ul className="sub-menu">
                  <li onClick={() => handleCategoryClick("Men")}>
                    <span>Men</span>
                  </li>
                  <li onClick={() => handleCategoryClick("Women")}>
                    <span>Women</span>
                  </li>
                  <li onClick={() => handleCategoryClick("Kids")}>
                    <span>Kids</span>
                  </li>
                </ul>
              )}
            </li>
            <Link to="/BlogPost">
              <li className="nav-item">Blog</li>
            </Link>
            <Link to="/ContactUs">
              <li className="nav-item">Contact Us</li>
            </Link>
          </ul>
          <div
            className={`burger-menu ${isMenuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
        <SearchBar />
        <div className={`menu-icons ${isMenuOpen ? "hide" : ""}`}>
          <Link to="/ProductForm">
            <FontAwesomeIcon icon={faPlus} className="menu-icon" />
          </Link>
          <Link to="/cart">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="menu-icon cart-tooltip"
            />
            <span className="cart-count">{totalQuantity}</span>
          </Link>
          <div className="tooltip-container">
            <FontAwesomeIcon icon={faBell} className="menu-icon" />
            <div className="tooltip">
              No new notifications.. Stay tuned for more!!
            </div>
          </div>
          {user ? (
            <div onClick={() => navigate("/Profile")}>
              <FontAwesomeIcon icon={faUser} className="menu-icon" />
            </div>
          ) : (
            <Link to="/Login">
              <FontAwesomeIcon icon={faUser} className="menu-icon" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
