import React from "react";
import s from "./s.module.scss";

import { Button, Image } from "antd";
import UserTag from "../../../../_shared/Components/UserTag/UserTag";
import { AiFillLike } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { FaShare } from "react-icons/fa"

type ImgModalProps = {
  imgUrl: string;
}

const ImgModal = (props: ImgModalProps): JSX.Element => {
  const { imgUrl } = props

  return (
    <div className={s.imgModal}>
      <div className={s.modalHeader}>
        <UserTag />
        <div className={s.headerBtns}>
          <Button icon={<AiFillLike />} size="large" />
          <Button icon={<GoPlus />} size="large" />
          <Button className={s.downloadBtn}>Download free</Button>
        </div>
      </div>
      <div className={s.modalContent}>
        <Image src={imgUrl} />
      </div>
      <div className={s.modalFooter}>
        <div className={s.imgMeta}>
          <div className={s.metaInfo}>
            <h1>Views</h1>
            <h2>145,587</h2>
          </div>
          <div className={s.metaInfo}>
            <h1>Downloads</h1>
            <h2>1,587</h2>
          </div>
        </div>
        <Button>
          <FaShare className={s.icon} />
          Share
        </Button>
      </div>
    </div>
  );
};

export default ImgModal;
