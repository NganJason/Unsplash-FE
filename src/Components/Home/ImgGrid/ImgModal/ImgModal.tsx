import React from "react";
import s from "./s.module.scss";

import { Button, Image, message } from "antd";
import UserTag from "../../../../_shared/Components/UserTag/UserTag";
import { AiFillLike, AiOutlineArrowDown } from "react-icons/ai";
import { FaShare } from "react-icons/fa"
import { Image as ImageType } from "../../../../_shared/api/client";
import { useDownloadImageMutation, useLikeImageMutation } from "../../../../_shared/mutations/unsplash";
import { toImgDownloadLink } from "../../../../_shared/utils/util";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../../../../_shared/hooks/useWindowDimensions";

type ImgModalProps = {
  img: ImageType;
};

const ImgModal = (props: ImgModalProps): JSX.Element => {
  const { img } = props
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  const { mutate: likeImage, isLoading: isLikeImageLoading } =
    useLikeImageMutation({
      onError: (err): void => {
        if (err instanceof Error) {
          if (err.message.includes("401")) {
            navigate("/?login=true");
            window.location.reload();
          } else {
            message.error(err.message);
          }
        }
      },
      onSuccess: () => {
        message.success("Added to liked library!");
      },
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
    <div className={s.imgModal}>
      <div className={s.modalHeader}>
        <UserTag user={img.user} />

        <div className={s.headerBtns}>
          <Button
            icon={<AiFillLike />}
            size="large"
            onClick={() => {
              likeImage(img.id || 0);
            }}
          />

          <a href={toImgDownloadLink(img.url || "")}>
            {width < 800 ? (
              <Button
                className={s.downloadBtn}
                onClick={() => {
                  downloadImage(img.id || 0);
                }}
              >
                <AiOutlineArrowDown/>
                Download
              </Button>
            ) : (
              <Button
                className={s.downloadBtn}
                onClick={() => {
                  downloadImage(img.id || 0);
                }}
              >
                Download Free
              </Button>
            )}
          </a>
        </div>
      </div>

      <div className={s.modalContent}>
        <Image src={img.url} />
      </div>
      <div className={s.modalFooter}>
        <div className={s.imgMeta}>
          <div className={s.metaInfo}>
            <h1>Likes</h1>
            <h2>{img.likes}</h2>
          </div>
          <div className={s.metaInfo}>
            <h1>Downloads</h1>
            <h2>{img.downloads}</h2>
          </div>
        </div>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(img.url || "");
            message.success("Copied to clipboard!");
          }}
        >
          <FaShare className={s.icon} />
          Share
        </Button>
      </div>
    </div>
  );
};

export default ImgModal;
