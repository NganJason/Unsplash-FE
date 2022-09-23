import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../api/client";
import { unknownImgUrl } from "../../constants/constant";
import s from "./s.module.scss";

declare const textColorTypes: ["white", "black"]

type UserTagProps = {
    user?: User;
    textColor?: typeof textColorTypes[number];
}

const UserTag = (props: UserTagProps): JSX.Element => {
    const {textColor ="black", user} = props
    const navigate = useNavigate();

    const handleOnclick = () => {
      navigate(`/user?id=${user?.id}`);
      window.location.reload();
    }
    return (
      <div className={s.userTag}>
        <img
          src={user?.profile_url || unknownImgUrl}
          alt="user_profile_pic"
          onClick={handleOnclick}
        />
        <div className={`${s.userInfo} ${s[textColor]}`}>
          <h1 onClick={handleOnclick}>{user?.username || ""}</h1>
        </div>
      </div>
    );
}

export default UserTag;