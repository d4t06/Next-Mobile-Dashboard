import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_ENDPOINT || "https://nest-mobile.vercel.app/api";

const request = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export { request };
