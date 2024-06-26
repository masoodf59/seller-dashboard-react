import { invokeApi } from "src/utils";

export const AllProducts = async (data) => {
  const requestObj = {
    path: `/api/product/all`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return invokeApi(requestObj);
};

export const AddProductData = async (data) => {
  const requestObj = {
    path: `/api/product/upload`,
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const UploadImage = async (data) => {
  const requestObj = {
    path: `/api/image/upload`,
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    postData: data,
  };
  return invokeApi(requestObj);
};
