import axios from "axios";
import Cookie from "js-cookie";

export const app_api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

app_api.interceptors.request.use((config: any) => {
  if (!!Cookie.get("s3d-v2-user")) {
    let shaping3DKey = JSON.parse(Cookie.get("s3d-v2-user")!);
    let token = shaping3DKey["access_token"];
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// app_api.interceptors.response.use(
//   (response) => response,
//   (err) => {
//     if (
//       !err.request?.responseURL?.match("/") &&
//       err?.response?.status === 401
//     ) {
//       window.location = "/logout";
//     } else return Promise.reject(err);
//   }
// );

export default app_api;
