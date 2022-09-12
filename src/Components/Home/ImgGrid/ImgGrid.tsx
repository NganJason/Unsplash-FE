import React, { useState } from "react";
import s from "./s.module.scss";

import { Modal } from "antd";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import ImgCard from "./ImgCard/ImgCard";
import ImgModal from "./ImgModal/ImgModal";

import { useGridColumns } from "../../../_shared/hooks/imgGrid/useGridColumns";
import { useImages } from "../../../_shared/hooks/imgGrid/useImages";

const images = [
  "https://images.unsplash.com/photo-1657299142997-cb45f5dfa9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1661308148762-3d89354e9e77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1661413617785-267c913f2b85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1661435805196-81136edfa297?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1661446600373-125cfeadf275?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1657299143363-621ba0a1e6ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1661433562004-382cc9079054?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1661417456360-30b8801b8013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1661441514034-f8f81780944c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1659535973636-6cef468d093b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1661437217309-2211ee9130a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1661431884514-bd535ab6c543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1661436259824-ea5c17a8f0f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1661442196003-f2f6eb54bd94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1661410188636-e187e06d66d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1661355102959-6e4f36eb6194?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1661443066898-45c0b2a1c396?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
];

const ImgGrid = (): JSX.Element => {
    const [modalVisible, setModalVisible] = useState(false);
    const { columns } = useGridColumns();
    const { imgs, fetchNextPage } = useImages(columns)

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
                      imgUrl={img.url || ""}
                      onClick={() => {
                        setCurrCol(col)
                        setCurrRow(row)
                        setModalVisible(true);
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
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
          <ImgModal imgUrl={imgs[currCol][currRow]?.url || ""} />
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