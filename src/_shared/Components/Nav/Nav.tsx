import React from "react"
import s from "./s.module.scss";
import { useLocation } from "react-router-dom";

import { MenuOutlined } from "@ant-design/icons";
import SearchBar from "./Searchbar/Searchbar";
import { Link } from "react-router-dom";

const unsplashIcon =
  "https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/unsplash-512.png";

const Nav = (): JSX.Element => {
  const location = useLocation();

    return (
      <div className={s.nav}>
        <div className={s.navBrand}>
          <Link to="/">
            <img src={unsplashIcon} />
          </Link>
        </div>

        <div className={s.navMiddle}>
          <SearchBar className={s.navSearch} />
        </div>

        <div className={s.navRight}>
          <div className={s.navSetting}>
            <p>
              <Link className={s.link} to={location.pathname + "?login=true"}>
                Login
              </Link>{" "}
              {" / "}
              <Link className={s.link} to="/signup">
                Signup
              </Link>
            </p>
          </div>

          <MenuOutlined className={s.hamburger} />
        </div>
      </div>
    );
}

export default Nav;