import {
  useMutation,
  UseMutationOptions,
} from "react-query";
import axios from "axios";

import { unsplashRequest } from "../api";
import { AddDeltaImageResponse, Image, SearchUsersResponse, UploadImageResponse, User } from "../api/client";
import { getJWTHeader } from "../utils/util";
import { getStoredUser } from "../utils/user_storage";

const formKeyUploadImg = "img"
const formKeyUploadProfileImg = "profile_img";

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
        },
        {
          headers: getJWTHeader(getStoredUser())
        }
        )

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

    let headers = getJWTHeader(getStoredUser())
    headers["Content-Type"] = "multipart/form-data"

    try {
      let resp: UploadImageResponse = await axios.post(url, formData, {
        headers: headers,
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

export const useUploadProfileImg = (
  options?: UseMutationOptions<Image | undefined, unknown, File, unknown>
) => {
  const uploadImageMutate = async (file: File): Promise<Image | undefined> => {
    let url: string = "/api/user/profile";
    let formData = new FormData();
    formData.append(formKeyUploadProfileImg, file);

    let headers = getJWTHeader(getStoredUser());
    headers["Content-Type"] = "multipart/form-data";

    try {
      let resp: UploadImageResponse = await axios.post(url, formData, {
        headers: headers,
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