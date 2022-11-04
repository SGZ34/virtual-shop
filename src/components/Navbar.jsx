import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../contexts";

export const Navbar = () => {
  const { elementsInCart } = useCart();

  const [openMenu, setOpenMenu] = useState(false);
  const handleClick = (e) => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="nav-container">
      <div className="logo-container">
        <Link className="logo" to="/">
          Virtual shop <i className="fa-solid fa-shop"></i>
        </Link>
      </div>
      <ul className={`menu ${openMenu ? "menu-active" : ""}`}>
        
        <li className="menu-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
            onClick={handleClick}
          >
            Home
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
            onClick={handleClick}
          >
            Products
          </NavLink>
        </li>
        <li className="menu-item cart">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
            onClick={handleClick}
          >
            <i className="fa-solid fa-cart-shopping cart-icon"></i>
          </NavLink>
          {elementsInCart > 0 && (
            <span className="quantity-cart">{elementsInCart}</span>
          )}
        </li>
      </ul>
      <div className="btn-menu" onClick={handleClick}>
        <i className="fa-solid fa-bars"></i>
      </div>
    </nav>
  );
};
