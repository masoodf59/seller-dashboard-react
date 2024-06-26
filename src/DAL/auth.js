import { invokeApi } from "src/utils";

export const login = async (data) => {
  const requestObj = {
    path: `/api/login`,
    method: "POST",
    headers: {
      // 'x-sh-auth': 1234
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const logout = async (data) => {
  const requestObj = {
    path: `/api/logout`,
    method: "GET",
    headers: {
      // 'x-sh-auth': 1234
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
