import { useQueryClient } from "react-query";
import { User } from "../_shared/api/client";
import { QueryKeys, useGetUserQuery } from "../_shared/queries/unsplash";
import { useLocation } from "react-router-dom";

interface UseUser {
    user: User | null | undefined;
    updateUser: (user: User | null) => void;
    clearUser: () => void;
}

export type map = {
  [key: string]: boolean;
};

const protectedRoute: map = {
    "/signup": true
}

const isRouteProtected = (path: string): boolean => {
    if (protectedRoute[path]) {
        return true
    }

    return false
}

export function useUser(): UseUser {
    const queryClient = useQueryClient();
    const location = useLocation();

    const { data: user } = useGetUserQuery(
        {},
        {
            refetchOnWindowFocus: true,
            refetchInterval: 30 * 1000,
            retry: 0,
            enabled: isRouteProtected(location.pathname)
        }
    )

    function updateUser(newUser: User | null): void {
        queryClient.setQueryData(QueryKeys.GET_USER, newUser);
    }

    function clearUser(): void {
        queryClient.setQueryData(QueryKeys.GET_USER, null)
    }

    return { user, updateUser, clearUser }
}