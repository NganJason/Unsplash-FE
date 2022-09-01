import React from "react";
import s from "./s.module.scss";

import { Button } from "antd";
import { AiFillLike, AiOutlineArrowDown } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import UserTag from "../../../../_shared/Components/UserTag/UserTag";

const rabbidImg =
  "https://i.pinimg.com/280x280_RS/e3/6c/c3/e36cc3cc4da34e439c87c0b9d513dca2.jpg";

type ImgCardProps = {
    imgUrl: string;
    onClick: () => void;
}

const ImgCard = (props: ImgCardProps) => {
    const { imgUrl, onClick } = props
    return (
      <div
        className={s.imgGrid}
        onClick={onClick}
      >
        <img src={imgUrl} alt="card_img" />
        <div className={s.imgShadow}></div>

        <div className={s.imgInfo}>
          <div className={s.infoHeader}>
            <Button
              className={s.infoBtn}
              type="primary"
              icon={<GoPlus />}
              size="large"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />

            <Button
              className={s.infoBtn}
              type="primary"
              icon={<AiFillLike />}
              size="large"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </div>

          <div className={s.infoFooter}>
            <UserTag textColor="white" />
            <Button
              className={s.infoBtn}
              type="primary"
              icon={<AiOutlineArrowDown />}
              size="large"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
        </div>
      </div>
    );
}

export default ImgCard