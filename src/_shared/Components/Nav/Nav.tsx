import React from "react"
import s from "./s.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
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
          key: "profile",
          label: (
            <div className={s.dropdownItem}>
              <CgProfile />
              <p>Profile</p>
            </div>
          ),
        },
        {
          key: "logout",
          label: (
            <div className={`${s.dropdownItem} ${s.dropdownItemLast}`}>
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
  const navigate = useNavigate();
  const { user } = useUser()
  const { logout } = useAuth();

  const menuOnClickHandler: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      logout();
      window.location.reload();
    }

    if (e.key === "profile") {
      navigate(`/user?id=${user?.id}`)
      window.location.reload()
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
                <div className={s.profile}>
                  <img
                    className={s.profileImg}
                    src={user.profile_url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                  />
                  <p>{user.username}</p>
                </div>
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