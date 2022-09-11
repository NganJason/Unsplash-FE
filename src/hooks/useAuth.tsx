import { message } from "antd";
import { unsplashRequest } from "../_shared/api";
import { CreateUserResponse, LoginUserResponse } from "../_shared/api/client";
import { useUser } from "./useUser";

interface UseAuth {
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, 
        password: string,
        username?: string,
        firstName?: string,
        lastName?: string) => Promise<void>;
    logout: () => Promise<void>;
}

export function useAuth(): UseAuth {
  const { clearUser, updateUser } = useUser();

  async function login(email: string, password: string): Promise<void> {
    try {
      const response: LoginUserResponse = await unsplashRequest.login.post({
        email_address: email,
        password: password,
      });

      updateUser(response.user);
    } catch (err) {
      if (err instanceof Error) {
        message.error(err.message);
      }
    }
  }

  async function signup(
    email: string,
    password: string,
    username?: string,
    firstName?: string,
    lastName?: string
  ): Promise<void> {
    try {
      const response: CreateUserResponse =
        await unsplashRequest.createUser.post({
          email_address: email,
          password: password,
          username: username,
          first_name: firstName,
          last_name: lastName,
        });

      updateUser(response.user);
    } catch (err) {
      if (err instanceof Error) {
        message.error(err.message);
      }

      throw err
    }
  }

  async function logout(): Promise<void> {
    try {
      await unsplashRequest.logout.post({});
      clearUser();
    } catch (err) {
      if (err instanceof Error) {
        message.error(err.message);
      }
    }
  }

  return {
    login,
    signup,
    logout,
  };
}