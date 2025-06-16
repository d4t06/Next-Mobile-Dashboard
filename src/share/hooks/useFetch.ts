import { useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../stores/AuthContext";
import { request } from "../../axios/request";
import type { AuthResponse } from "../../pages/Login";
import { useToastContext } from "@/stores/ToastContext";

const REFRESH_URL =
  (import.meta.env.VITE_API_ENDPOINT || "https://nest-mobile.vercel.app/api") +
  "/auth/refresh";

export function useRefreshToken() {
  const { setUser, setLoading } = useAuthContext();
  const { showToast } = useToastContext();

  const refresh = async () => {
    try {
      const response = await axios.get(REFRESH_URL, { withCredentials: true });

      const payload = response.data as AuthResponse;

      setUser({
        role: payload.user.role,
        token: payload.token,
        username: payload.user.username,
      });

      return payload.token;
    } catch (error: any) {
      console.log({ message: error });
      showToast(false, error.message + error.code);
    } finally {
      setLoading(false);
    }
  };
  return refresh;
}

export default function useFetch() {
  const refresh = useRefreshToken();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;
    const requestIntercept = request.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user.token}`;
        }

        // console.log("private request auth =", auth)
        return config;
      },
      (err) => Promise.reject(err), // Do something with response error
    );

    const responseIntercept = request.interceptors.response.use(
      (response) => response, // Do something with response data

      async (err) => {
        // Do something with response error
        const prevRequest = err?.config;

        if (err?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;

          return request(prevRequest);
        }
        return Promise.reject(err);
      },
    );

    return () => {
      request.interceptors.request.eject(requestIntercept);
      request.interceptors.response.eject(responseIntercept);
    };
  }, [user, refresh]);

  return request;
}
