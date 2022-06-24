import request from "@/utils/request";

export function getUserList(params: any): Promise<any> {
  return request("user/list", {
    params,
    baseURL: import.meta.env.VITE_APP_MOCK_API,
  });
}
