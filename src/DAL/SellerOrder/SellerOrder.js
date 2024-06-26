import { invokeApi } from "src/utils";

export const SellerOrderData = async (data) => {
  const requestObj = {
    path: `/api/seller/order/show`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return invokeApi(requestObj);
};
