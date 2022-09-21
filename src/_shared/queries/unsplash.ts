import { useInfiniteQuery, useQuery, UseQueryOptions } from "react-query";
import { unsplashRequest } from "../api";
import { GetImagesResponse, VerifyUserRequest, VerifyUserResponse, User, GetUserResponse, GetUserLikesResponse, Image } from "../api/client"

export enum QueryKeys {
  VERIFY_USER = "VERIFY_USER",
  GET_USER = "GET_USER",
  GET_IMAGES = "GET_IMAGES",
  GET_USER_LIKES = "GET_USER_LIKES",
}

export const useVerifyUserQuery = (
    params: VerifyUserRequest,
    options?: UseQueryOptions<User | null>
) => {
    const verifyUserFetch = async (): Promise<User | null> => {
        const response: VerifyUserResponse = await unsplashRequest.verifyUser.post(
            params as VerifyUserRequest
        );

        return response.user
    }

    return useQuery<User | null>(
      [QueryKeys.VERIFY_USER],
      verifyUserFetch,
      options
    );
}

export const useGetUserQuery = (
  userID: number,
  options?: UseQueryOptions<User | null>
) => {
  const getUserFetch = async (): Promise<User | null> => {
    const response: GetUserResponse = await unsplashRequest.getUser.post(
      {
        user_id: userID
      }
    );

    return response.user
  }

  return useQuery<User | null>(
    [QueryKeys.GET_USER],
    getUserFetch,
    options
  );
}

export const useGetImagesQuery = () => {
  const fetchImage = async ({pageParam = null}): Promise<GetImagesResponse> => {
    const response: GetImagesResponse = await unsplashRequest.getImages.post({
      cursor: pageParam,
      page_size: 10
    })

    return response
  }

  return useInfiniteQuery<GetImagesResponse>(
    [QueryKeys.GET_IMAGES],
    fetchImage,
    {
      getNextPageParam: (lastPage, _) => {
        if (lastPage.next_cursor === null) {
          return undefined
        }
        return lastPage.next_cursor
      }
    }
  )
}

export const useGetUserLikesQuery = (
  userID: number,
  options?: UseQueryOptions<Image[] | []>
) => {
  const fetchGetUserLikes = async (): Promise<Image[]> => {
    const response: GetUserLikesResponse =
      await unsplashRequest.getUserLikes.post({
        user_id: userID,
      });

    return response.images ?? [];
  };

  return useQuery<Image[] | []>(
    [QueryKeys.GET_USER_LIKES],
    fetchGetUserLikes,
    options
  );
};