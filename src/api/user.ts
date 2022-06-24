import request from "@/utils/request";

export function login(params: any): Promise<any> {
  return request.post("login", params, {
    baseURL: import.meta.env.VITE_APP_MOCK_API,
  });
}

export function getInfo() {
  return request("userInfo", {
    baseURL: import.meta.env.VITE_APP_MOCK_API,
  });
}

export function logout(): Promise<any> {
  return request.post(
    "post",
    {},
    {
      baseURL: import.meta.env.VITE_APP_MOCK_API,
    }
  );
}
