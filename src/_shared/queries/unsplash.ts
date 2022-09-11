import { useQuery, UseQueryOptions } from "react-query";
import { unsplashRequest } from "../api";
import { GetUserRequest, GetUserResponse, User } from "../api/client"

import axios from "axios";

export enum QueryKeys {
    GET_USER = 'GET_USER'
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