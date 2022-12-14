import React from "react";
import s from "./s.module.scss";

import { Button, message } from "antd";
import { AiFillLike, AiOutlineArrowDown } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import UserTag from "../../../../_shared/Components/UserTag/UserTag";
import { Image } from "../../../../_shared/api/client";
import { useDownloadImageMutation, useLikeImageMutation } from "../../../../_shared/mutations/unsplash";
import { toImgDownloadLink } from "../../../../_shared/utils/util";
import { useNavigate } from "react-router-dom";


type ImgCardProps = {
    img: Image;
    imgUrl: string;
    onClick: () => void;
}

const ImgCard = (props: ImgCardProps) => {
    const { img, imgUrl, onClick } = props
    const navigate = useNavigate();

    const { mutate: likeImage, isLoading: isLikeImageLoading } =
      useLikeImageMutation({
        onError: (err): void => {
          if (err instanceof Error) {
            if (err.message.includes("401")) {
              navigate("/?login=true");
              window.location.reload()
            } else {
              message.error(err.message);
            }
          }
        },
        onSuccess: () => {
          message.success("Added to liked library!");
        }
      });

    const { mutate: downloadImage, isLoading: isDownloadImgLoading } =
      useDownloadImageMutation({
        onError: (err): void => {
          // if (err instanceof Error) {
          //   message.error(err.message);
          // }
        },
      });

    return (
      <div className={s.imgGrid} onClick={onClick}>
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
                likeImage(img.id || 0);
              }}
            />

            <Button
              className={s.infoBtn}
              type="primary"
              icon={<FaShare />}
              size="large"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(img.url || "");
                message.success("Copied to clipboard!");
              }}
            />
          </div>

          <div className={s.infoFooter}>
            <UserTag user={img.user} textColor="white" />
            <a href={toImgDownloadLink(img.url || "")}>
              <Button
                className={s.infoBtn}
                type="primary"
                icon={<AiOutlineArrowDown />}
                size="large"
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(img.id || 0);
                }}
              />
            </a>
          </div>
        </div>
      </div>
    );
}

export default React.memo(ImgCard);