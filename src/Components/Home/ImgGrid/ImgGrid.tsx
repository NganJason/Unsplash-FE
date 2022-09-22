import React, { useState } from "react";
import s from "./s.module.scss";

import { Modal, Spin } from "antd";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import ImgCard from "./ImgCard/ImgCard";
import ImgModal from "./ImgModal/ImgModal";

import { useGridColumns } from "../../../_shared/hooks/imgGrid/useGridColumns";
import { useImages } from "../../../_shared/hooks/imgGrid/useImages";
import { useScroll } from "../../../_shared/hooks/useScroll";
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "react-query";
import { GetImagesResponse } from "../../../_shared/api/client";

type ImgGridProps = {
  data: InfiniteData<GetImagesResponse> | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<GetImagesResponse, unknown>>;
  isLoading?: boolean;
};

const ImgGrid = (props: ImgGridProps): JSX.Element => {
    const { data, fetchNextPage, isLoading } = props
    const [modalVisible, setModalVisible] = useState(false);
    const { columns } = useGridColumns();
    const { imgs } = useImages(data, columns)
    useScroll(fetchNextPage)

    const [currRow, setCurrRow] = useState(0);
    const [currCol, setCurrCol] = useState(0)

    const setPrevRowCol = () => {
      let prevRow, prevCol

      if (currCol === 0 && currRow === 0) {
        return
      }

      if (currCol === 0) {
        prevCol = columns - 1
        prevRow = currRow - 1
      } else {
        prevCol = currCol - 1
        prevRow = currRow
      }

      setCurrCol(prevCol)
      setCurrRow(prevRow)
    }

    const setNextRowCol = () => {
      let nextRow, nextCol

      if (currCol === columns - 1) {
        nextCol = 0
        nextRow = currRow + 1
      } else {
        nextCol = currCol + 1
        nextRow = currRow
      }

      if (imgs[nextCol][nextRow] === undefined) {
        return
      }

      setCurrCol(nextCol)
      setCurrRow(nextRow)
    }

    return (
      <div>
        <div
          className={s.columnGrid}
          style={{ "--cols": columns } as React.CSSProperties}
        >
          {imgs.map((colImgs, col) => {
            return (
              <div className={s.rowGrid}>
                {colImgs.map((img, row) => {
                  return (
                    <ImgCard
                      img={img}
                      imgUrl={img.url || ""}
                      onClick={() => {
                        setCurrCol(col);
                        setCurrRow(row);
                        setModalVisible(true);
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
          {isLoading && (
            <div className={s.loadingSpin}>
              <Spin size="large"/>
            </div>
          )}
        </div>
        <Modal
          title=""
          maskClosable={true}
          footer={null}
          width={1000}
          centered
          style={{ padding: "2rem 1rem" }}
          visible={modalVisible}
          onCancel={(e) => {
            setModalVisible(false);
          }}
          className={s.modal}
        >
          <ImgModal img={imgs[currCol][currRow]} />
          <AiOutlineLeft
            className={`${s.nextBtn} ${s.left}`}
            onClick={setPrevRowCol}
          />
          <AiOutlineRight
            className={`${s.nextBtn} ${s.right}`}
            onClick={setNextRowCol}
          />
        </Modal>
      </div>
    );
}

export default ImgGrid