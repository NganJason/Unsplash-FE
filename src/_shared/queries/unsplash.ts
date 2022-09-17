import { useInfiniteQuery, useQuery, UseQueryOptions } from "react-query";
import { unsplashRequest } from "../api";
import { GetImagesResponse, GetUserRequest, GetUserResponse, User } from "../api/client"

export enum QueryKeys {
    GET_USER = 'GET_USER',
    GET_IMAGES = 'GET_IMAGES'
}

export const useGetUserQuery = (
    params: GetUserRequest,
    options?: UseQueryOptions<User | null>
) => {
    const getUserFetch = async (): Promise<User | null> => {
        const response: GetUserResponse = await unsplashRequest.getUser.post(
            params as GetUserRequest
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