import React from "react"
import s from "./s.module.scss";

import { MenuOutlined } from "@ant-design/icons";
import SearchBar from "./Searchbar/Searchbar";

const unsplashIcon =
  "https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/unsplash-512.png";


const Nav = (): JSX.Element => {
    return (
      <div className={s.nav}>
        <div className={s.navBrand}>
          <img src={unsplashIcon} />
        </div>

        <div className={s.navMiddle}>
          <SearchBar className={s.navSearch}/>
        </div>

        <div className={s.navRight}>
          <div className={s.navSetting}>
            <p>Login / Sign up</p>
          </div>

          <MenuOutlined className={s.hamburger} />
        </div>
      </div>
    );
}

export default Nav;