import { useQueryClient } from "react-query";
import { User } from "../_shared/api/client";
import { QueryKeys, useVerifyUserQuery } from "../_shared/queries/unsplash";

interface UseUser {
    user: User | null | undefined;
    updateUser: (user: User | null) => void;
    clearUser: () => void;
}

export function useUser(): UseUser {
    const queryClient = useQueryClient();

    const { data: user } = useVerifyUserQuery(
        {},
        {
            refetchOnWindowFocus: true,
            refetchInterval: 30 * 1000,
            retry: 0,
        }
    )

    function updateUser(newUser: User | null): void {
        queryClient.setQueryData(QueryKeys.VERIFY_USER, newUser);
    }

    function clearUser(): void {
        queryClient.setQueryData(QueryKeys.VERIFY_USER, null)
    }

    return { user, updateUser, clearUser }
}