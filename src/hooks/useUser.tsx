import { useQueryClient } from "react-query";
import { User } from "../_shared/api/client";
import { QueryKeys, useVerifyUserQuery } from "../_shared/queries/unsplash";
import { clearStoredUser, getStoredUser, setStoredUser } from "../_shared/utils/user_storage";

interface UseUser {
    user: User | null | undefined;
    updateUser: (user: User | null) => void;
    clearUser: () => void;
}

export function useUser(): UseUser {
    const queryClient = useQueryClient();
    
    const { data: user } = useVerifyUserQuery(
        {
            initialData: getStoredUser,
            refetchOnWindowFocus: true,
            refetchInterval: 30 * 1000,
            retry: 0,
            onSuccess: (received: null | User) => {
                if (received) {
                    setStoredUser(received)
                } else {
                    clearStoredUser()
                }
            }
        }
    )

    function updateUser(newUser: User | null): void {
        queryClient.setQueryData(QueryKeys.VERIFY_USER, newUser);

        if (newUser) {
            setStoredUser(newUser)
        } else {
            clearStoredUser()
        }
    }

    function clearUser(): void {
        clearStoredUser();
        queryClient.setQueryData(QueryKeys.VERIFY_USER, null)
    }

    return { user, updateUser, clearUser }
}