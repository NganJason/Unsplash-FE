import React from "react";
import s from "./s.module.scss";

import { Button, Image } from "antd";
import UserTag from "../../../../_shared/Components/UserTag/UserTag";
import { AiFillLike } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { FaShare } from "react-icons/fa"

const ImgModal = (): JSX.Element => {
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
        <Image src="https://images.unsplash.com/photo-1657299142997-cb45f5dfa9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
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
