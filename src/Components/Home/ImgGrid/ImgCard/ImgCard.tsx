import React from "react";
import s from "./s.module.scss";

import { Button, message } from "antd";
import { AiFillLike, AiOutlineArrowDown } from "react-icons/ai";
import UserTag from "../../../../_shared/Components/UserTag/UserTag";
import { Image } from "../../../../_shared/api/client";
import { useDownloadImageMutation, useLikeImageMutation } from "../../../../_shared/mutations/unsplash";


type ImgCardProps = {
    img: Image;
    imgUrl: string;
    onClick: () => void;
}

const ImgCard = (props: ImgCardProps) => {
    const { img, imgUrl, onClick } = props

    const { mutate: likeImage, isLoading: isLikeImageLoading } =
      useLikeImageMutation({
        onError: (err): void => {
          if (err instanceof Error) {
            message.error(err.message);
          }
        },
      });

    const { mutate: downloadImage, isLoading: isDownloadImgLoading } =
      useDownloadImageMutation({
        onError: (err): void => {
          if (err instanceof Error) {
            message.error(err.message);
          }
        },
      });

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
              icon={<AiFillLike />}
              size="large"
              onClick={(e) => {
                e.stopPropagation();
                likeImage(img.id || 0)
                message.success("Added to liked library!")
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
                downloadImage(img.id  || 0)
              }}
            />
          </div>
        </div>
      </div>
    );
}

export default ImgCard