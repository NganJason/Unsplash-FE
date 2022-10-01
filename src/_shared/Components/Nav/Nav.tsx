import React from "react"
import s from "./s.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import { useUser } from "../../../hooks/useUser";

import { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogin, AiOutlineCloudUpload } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoLogoGithub } from "react-icons/io";
import type { MenuProps } from "antd";
import SearchBar from "./Searchbar/Searchbar";

import { toCapitalise } from "../../utils/util";
import { unknownImgUrl } from "../../constants/constant";
import { BsGithub } from "react-icons/bs";

const unsplashIcon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_lVj4bb8PX53WbABn6ptqcrK_C6IR7R6QP_tX0WF3Qqpnmno5HpobV3PvVufiyoxu9IY&usqp=CAU";

const profileMenu = (menuOnClickHandler: MenuProps["onClick"], isLoggedIn: boolean): JSX.Element => {
  let items = [
    {
      key: "upload",
      label: (
        <div className={s.dropdownItem}>
          <AiOutlineCloudUpload />
          <p>Upload Photo</p>
        </div>
      ),
    },
    {
      key: "github",
      label: (
        <div className={s.dropdownItem}>
          <BsGithub />
          <p>Github</p>
        </div>
      ),
    },
  ];

  if (isLoggedIn) {
    items.unshift({
      key: "profile",
      label: (
        <div className={s.dropdownItem}>
          <CgProfile />
          <p>Profile</p>
        </div>
      ),
    });

    items.push({
      key: "logout",
      label: (
        <div className={`${s.dropdownItem} ${s.dropdownItemLast}`}>
          <RiLogoutBoxRLine />
          <p>Logout</p>
        </div>
      ),
    });
  } else {
    items.unshift({
      key: "signup",
      label: (
        <div className={s.dropdownItem}>
          <AiOutlineLogin />
          <p>Signup</p>
        </div>
      ),
    });
  }

  return (
    <Menu
      style={{ minWidth: "150px" }}
      onClick={menuOnClickHandler}
      items={items}
    />
  );
};

const Nav = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser()
  const { logout } = useAuth();

  const menuOnClickHandler: MenuProps["onClick"] = async (e) => {
    if (e.key === "logout") {
      await logout();
      navigate("/")
      window.location.reload();
    }

    if (e.key === "profile") {
      navigate(`/user?id=${user?.id}`)
      window.location.reload()
    }

    if (e.key === "signup") {
      navigate("/signup")
      window.location.reload()
    }

    if (e.key === "upload") {
      if (user) {
        navigate(`${window.location.pathname}?upload=true`);
      } else {
        navigate(`${window.location.pathname}?login=true`);
      }

      window.location.reload();
    }

    if (e.key === "github") {
      window.open("https://github.com/NganJason/Unsplash-FE");
    }
  };

    const onUploadPhoto = () => {
      if (!user) {
        navigate("?login=true")
      } else {
        navigate("?upload=true")
      }
    }

    return (
      <div className={s.nav}>
        <div
          className={s.navBrand}
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          <img src={unsplashIcon} alt="nav icon" />
        </div>

        <div className={s.navMiddle}>
          <SearchBar className={s.navSearch} />
        </div>

        <div className={s.navRight}>
          <div className={s.navSetting}>
              <IoLogoGithub 
                className={s.gitlab} 
                onClick={() => {
                  window.open("https://github.com/NganJason/Unsplash-FE");
                }}
              />

            <Button onClick={onUploadPhoto}>Upload photo</Button>
            {user ? (
              <Dropdown
                overlay={profileMenu(menuOnClickHandler, user !== null)}
                placement="bottomRight"
              >
                <div className={s.profile}>
                  <img
                    className={s.profileImg}
                    src={user.profile_url || unknownImgUrl}
                    alt="user_profile_pic"
                  />
                  <p>
                    {`${toCapitalise(user.last_name || "")} ${toCapitalise(
                      user.first_name || ""
                    )}`}
                  </p>
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
          <Dropdown
            overlay={profileMenu(menuOnClickHandler, user !== undefined)}
            placement="bottomRight"
          >
            <MenuOutlined className={s.hamburger} />
          </Dropdown>
        </div>
      </div>
    );
}

export default Nav;