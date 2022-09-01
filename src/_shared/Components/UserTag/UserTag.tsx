import React from "react";
import { Link } from "react-router-dom";
import s from "./s.module.scss";

const rabbidImg =
  "https://i.pinimg.com/280x280_RS/e3/6c/c3/e36cc3cc4da34e439c87c0b9d513dca2.jpg";


declare const textColorTypes: ["white", "black"]

type UserTagProps = {
    textColor?: typeof textColorTypes[number];
}

const UserTag = (props: UserTagProps): JSX.Element => {
    const {textColor ="black"} = props

    return (
      <div className={s.userTag}>
        <Link to="/user">
          <img src={rabbidImg} />
        </Link>

        <div className={`${s.userInfo} ${s[textColor]}`}>
          <Link to="/user">
            <h1>Jason Ngan</h1>
          </Link>
          <Link to="/user">
            <h2>Available to hire</h2>
          </Link>
        </div>
      </div>
    );
}

export default UserTag;