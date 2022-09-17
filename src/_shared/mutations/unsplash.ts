import {
  useMutation,
  UseMutationOptions,
} from "react-query";
import { unsplashRequest } from "../api";
import { AddDeltaImageResponse, Image } from "../api/client";

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