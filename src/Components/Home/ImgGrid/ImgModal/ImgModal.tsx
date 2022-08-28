import React from "react";
import UserTag from "../../../../_shared/Components/UserTag/UserTag";
import s from "./s.module.scss";

const ImgModal = (): JSX.Element => {
    return (
      <div className={s.imgModal}>
        <div className={s.modalHeader}>
            <div>
                <UserTag />
            </div>

            <div className={s.headerBtns}></div>
        </div>
        <div className={s.modalContent}></div>
        <div className={s.modalFooter}></div>
      </div>
    );
}

export default ImgModal;