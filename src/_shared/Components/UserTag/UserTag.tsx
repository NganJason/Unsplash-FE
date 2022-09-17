import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../api/client";
import s from "./s.module.scss";

declare const textColorTypes: ["white", "black"]

type UserTagProps = {
    user?: User;
    textColor?: typeof textColorTypes[number];
}

const UserTag = (props: UserTagProps): JSX.Element => {
    const {textColor ="black", user} = props

    return (
      <div className={s.userTag}>
        <Link to="/user">
          <img src={user?.profile_url || ""} />
        </Link>

        <div className={`${s.userInfo} ${s[textColor]}`}>
          <Link to="/user">
            <h1>{user?.username || ""}</h1>
          </Link>
        </div>
      </div>
    );
}

export default UserTag;