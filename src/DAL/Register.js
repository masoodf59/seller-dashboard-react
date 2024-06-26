import { invokeApi } from "src/utils";

export const register = async (data) => {
  const requestObj = {
    path: `/api/register`,
    method: "POST",
    headers: {
      // 'x-sh-auth': 1234
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
