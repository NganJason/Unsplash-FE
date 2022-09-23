import React, { useState, useEffect } from "react";
import { InfiniteData } from "react-query";
import { GetImagesResponse, Image } from "../../api/client";

export const useImages = (
  data: InfiniteData<GetImagesResponse> | undefined,
  columns: number
) => {
  const [imgs, setImgs] = useState<Array<Image[]>>([[]]);

  useEffect(() => {
    let parsedImgs: Image[] = parseServerImgs(data);
    let images: Array<Image[]> = splitImgToCols(parsedImgs, columns);

    setImgs(images);
  }, [columns, data]);

  return { imgs };
};

const parseServerImgs = (
  data: InfiniteData<GetImagesResponse> | undefined
): Image[] => {
  let imgs: Image[] = [];

  data?.pages.map((data, _) => {
    let images = data.images ?? [];
    imgs.push(...images);

    return null
  });

  return imgs;
};

const splitImgToCols = (images: Image[], cols: number): Array<Image[]> => {
  if (cols === 0) {
    return [];
  }

  let imgs = new Array(cols).fill(0).map(() => new Array(0));

  for (let i = 0; i < images.length; i++) {
    let idx = i % cols;
    imgs[idx].push(images[i]);
  }

  return imgs;
};