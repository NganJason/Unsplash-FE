import React from "react"
import s from "./s.module.scss";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import { useUser } from "../../../hooks/useUser";

import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import type { MenuProps } from "antd";

import SearchBar from "./Searchbar/Searchbar";

const unsplashIcon =
  "https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/unsplash-512.png";

const profileMenu = (menuOnClickHandler: MenuProps["onClick"]): JSX.Element => {
  return (
    <Menu
      style={{ minWidth: "150px" }}
      onClick={menuOnClickHandler}
      items={[
        {
          key: "1",
          label: (
            <div className={s.dropdownItem}>
              <CgProfile />
              <p>Profile</p>
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div className={s.dropdownItem}>
              <RiLogoutBoxRLine />
              <p>Logout</p>
            </div>
          ),
        },
      ]}
    />
  );
};

const Nav = (): JSX.Element => {
  const location = useLocation();
  const { user } = useUser()
  const { logout } = useAuth();

  const menuOnClickHandler: MenuProps["onClick"] = (e) => {
    if (e.key === "2") {
      logout();
      window.location.reload();
    }
  };

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
            {user ? (
              <Dropdown
                overlay={profileMenu(menuOnClickHandler)}
                placement="bottomRight"
              >
                <p>{user.username}</p>
              </Dropdown>
            ) : (
              <p>
                <Link className={s.link} to={location.pathname + "?login=true"}>
                  Login
                </Link>{" "}
                {" / "}
                <Link className={s.link} to="/signup">
                  Signup
                </Link>
              </p>
            )}
          </div>

          <MenuOutlined className={s.hamburger} />
        </div>
      </div>
    );
}

export default Nav;