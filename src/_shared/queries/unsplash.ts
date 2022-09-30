import { useInfiniteQuery, useQuery, UseQueryOptions } from "react-query";
import { unsplashRequest } from "../api";
import { GetImagesResponse, VerifyUserRequest, VerifyUserResponse, User, GetUserResponse, GetUserLikesResponse } from "../api/client"
import { getStoredUser } from "../utils/user_storage"
import { getJWTHeader } from "../utils/util";

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
    const verifyUserFetch = async (
    ): Promise<User | null> => {
      const response: VerifyUserResponse =
        await unsplashRequest.verifyUser.post(
        {},
        {
          headers: getJWTHeader(getStoredUser()),
        });

      return response.user;
    };

    return useQuery<User | null>(
      [QueryKeys.VERIFY_USER],
      verifyUserFetch,
      options
    );
}

export const useGetUserQuery = (
  userID?: number,
  username?: string,
  options?: UseQueryOptions<User | null>
) => {
  const getUserFetch = async (): Promise<User | null> => {
    const response: GetUserResponse = await unsplashRequest.getUser.post(
      {
        user_id: userID,
        username: username
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

export const useGetImagesQuery = (
  enabled: boolean | undefined,
  userID?: number, 
) => {
  const fetchImage = async ({
    pageParam = null,
  }): Promise<GetImagesResponse> => {
    const response: GetImagesResponse = await unsplashRequest.getImages.post({
      user_id: userID,
      cursor: pageParam,
      page_size: 10,
    });

    return response;
  };

  return useInfiniteQuery<GetImagesResponse>(
    [QueryKeys.GET_IMAGES],
    fetchImage,
    {
      getNextPageParam: (lastPage, _) => {
        if (lastPage.next_cursor === null) {
          return undefined;
        }
        return lastPage.next_cursor;
      },
      enabled: enabled,
    }
  );
};

export const useGetUserLikesQuery = (
  userID: number,
  enabled: boolean | undefined
) => {
  const fetchGetUserLikes = async ({
    pageParam = null,
  }): Promise<GetUserLikesResponse> => {
    const response: GetUserLikesResponse =
      await unsplashRequest.getUserLikes.post({
        user_id: userID,
        cursor: pageParam,
        page_size: 10,
      });

    return response;
  };

  return useInfiniteQuery<GetUserLikesResponse>(
    [QueryKeys.GET_USER_LIKES],
    fetchGetUserLikes,
    {
      getNextPageParam: (lastPage, _) => {
        if (lastPage.next_cursor === null) {
          return undefined;
        }
        return lastPage.next_cursor;
      },
      enabled: enabled
    }
  );
};