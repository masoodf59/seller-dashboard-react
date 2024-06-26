import { invokeApi } from "src/utils";

export const AllUsers = async (data) => {
  const requestObj = {
    path: `/api/users`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return invokeApi(requestObj);
};
