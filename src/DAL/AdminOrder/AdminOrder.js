import { invokeApi } from "src/utils";

export const AdminOrderData = async (data) => {
  const requestObj = {
    path: `/api/admin/order/show`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return invokeApi(requestObj);
};

export const updateStatus = async (data) => {
  const requestObj = {
    path: `/api/admin/order/status`,
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    postData: data,
  };
  return invokeApi(requestObj);
};
