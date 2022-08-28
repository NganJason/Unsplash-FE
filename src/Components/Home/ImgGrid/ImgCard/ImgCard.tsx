import React from "react";
import s from "./s.module.scss";

import { Button } from "antd";
import { AiFillLike, AiOutlineArrowDown } from "react-icons/ai";
import { GoPlus } from "react-icons/go";

const rabbidImg =
  "https://i.pinimg.com/280x280_RS/e3/6c/c3/e36cc3cc4da34e439c87c0b9d513dca2.jpg";

type ImgCardProps = {
    imgUrl: string;
}

const ImgCard = (props: ImgCardProps): JSX.Element => {
    const { imgUrl } = props
    return (
      <div className={s.imgGrid}>
        <img src={imgUrl} alt="card_img"/>
        <div className={s.imgShadow}></div>

        <div className={s.imgInfo}>
          <div className={s.infoHeader}>
            <Button
              className={s.infoBtn}
              type="primary"
              icon={<GoPlus />}
              size="large"
            />

            <Button
              className={s.infoBtn}
              type="primary"
              icon={<AiFillLike />}
              size="large"
            />
          </div>

          <div className={s.infoFooter}>
            <div className={s.user}>
              <img src={rabbidImg} alt="user_profile"/>
              <div className={s.userInfo}>
                <h1>Jason Ngan</h1>
                <h2>Available for hire</h2>
              </div>
            </div>
            <Button
              className={s.infoBtn}
              type="primary"
              icon={<AiOutlineArrowDown />}
              size="large"
            />
          </div>
        </div>
      </div>
    );
}

export default ImgCard