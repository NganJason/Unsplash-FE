import React from "react";
import s from "./s.module.scss";

import { Button } from "antd";
import { AiFillLike, AiOutlineArrowDown } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import UserTag from "../../../../_shared/Components/UserTag/UserTag";
import { Image } from "../../../../_shared/api/client";


type ImgCardProps = {
    img: Image;
    imgUrl: string;
    onClick: () => void;
}

const ImgCard = (props: ImgCardProps) => {
    const { img, imgUrl, onClick } = props
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
            <UserTag user={img.user} textColor="white" />
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