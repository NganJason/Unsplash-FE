import {
  useMutation,
  UseMutationOptions,
} from "react-query";
import axios from "axios";

import { unsplashRequest } from "../api";
import { AddDeltaImageResponse, Image, UploadImageResponse } from "../api/client";

const formKeyUploadImg = "img"

export const useLikeImageMutation = (
    options?: UseMutationOptions<
        Image,
        unknown,
        number,
        unknown
    >
) => {
    const likeImage = async (
        imageID: number
    ):Promise<Image> => {
        const response: AddDeltaImageResponse = await unsplashRequest.addDeltaImage.post({
            image_id: imageID,
            delta_image: {
                likes: 1
            }
        })

        return response.image ?? {}
    }

    return useMutation(likeImage, options)
}

export const useDownloadImageMutation = (
  options?: UseMutationOptions<Image, unknown, number, unknown>
) => {
  const likeImage = async (imageID: number): Promise<Image> => {
    const response: AddDeltaImageResponse =
      await unsplashRequest.addDeltaImage.post({
        image_id: imageID,
        delta_image: {
          downloads: 1,
        },
      });

    return response.image ?? {};
  };

  return useMutation(likeImage, options);
};

export const useUploadImage = (
  options?: UseMutationOptions<Image | undefined, unknown, File, unknown>
) => {
  const uploadImageMutate = async (file: File): Promise<Image | undefined> => {
    let url: string = "/api/image/upload";
    let formData = new FormData();
    formData.append(formKeyUploadImg, file);

    try {
      let resp: UploadImageResponse = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (resp.debug_msg && resp.debug_msg !== "") {
        throw new Error(resp.debug_msg);
      }

      return resp.image;
    } catch (err) {
      throw err;
    }
  };

  return useMutation(uploadImageMutate, options);
};