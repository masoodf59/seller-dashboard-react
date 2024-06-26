import {
  Button,
  FormHelperText,
  IconButton,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Iconify } from "src/components";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { AddProductData, UploadImage } from "src/DAL/Products/Product";
import { forEach } from "lodash";
import { useSnackbar } from "notistack";

export default function AddProduct() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [inputs, setInputs] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });
  const [images, setImages] = useState();

  console.log(inputs?.image, "hdjsfgjgdsjfgjsd");
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const fileChangeHandler = (event) => {
    const files = event.target.files[0];
    setImages(files);
    setInputs({
      ...inputs,
      ["image"]: URL.createObjectURL(files),
    });
    // const newImages = [];

    // for (let i = 0; i < files.length; i++) {
    //   newImages.push({
    //     file: files[i],
    //     name: files[i].name,
    //     url: URL.createObjectURL(files[i]),
    //   });
    // }

    // setImages((prevImages) => [...prevImages, ...newImages]);
  };

  //   const fileChangeHandler = (e) => {
  //     setImages([...images, e.target.files]);
  //     // setPic({
  //     //   ...pic,
  //     //   [name]: URL.createObjectURL(files[0]),
  //     // });
  //     // setInputs({
  //     //   ...inputs,
  //     //   [name]: files[0],
  //     // });
  //   };

  const handleNav = () => {
    navigate("/products");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", inputs?.title);
    formData.append("price", inputs?.price);
    formData.append("description", inputs?.description);
    formData.append("image", images);
    const result = await AddProductData(formData);
    if (result.status == true) {
      enqueueSnackbar(result.message, { variant: "success" });
      navigate("/products");
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }
  };
  return (
    <>
      <form>
        <div className="row container">
          <div className="col-lg-12">
            <Stack direction="row">
              <IconButton onClick={handleNav} className="me-1">
                <Iconify icon="ep:back" />
              </IconButton>
              <Typography variant="h4">Add Product</Typography>
            </Stack>
          </div>

          <div className="col-lg-6 mt-4">
            <TextField
              fullWidth
              label="Title"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6 mt-4">
            <TextField
              fullWidth
              label="Price"
              name="price"
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-12 mt-4">
            <TextField
              multiline
              rows={6}
              fullWidth
              label="Enter Description"
              name="description"
              onChange={handleChange}
            />
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
            <div className="row w-100 div-style ms-0 pt-0">
              <div className="col-5">
                <p>Upload Image *</p>
                <FormHelperText className="pt-0">
                  Image Size(1000 X 670) ("JPG", "JPEG", "PNG","WEBP")
                </FormHelperText>
              </div>
              <div className="col-2">
                <img src={inputs?.image} height="50" />
              </div>
              <div className="col-5 text-end pt-2">
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    multiple
                    name="image"
                    className="d-none"
                    onChange={fileChangeHandler}
                  />

                  <Button
                    startIcon={<FileUploadIcon />}
                    component="span"
                    variant="outlined"
                  >
                    Upload
                  </Button>
                </label>
              </div>
            </div>
          </div>
          <div className="text-end">
            <button className="small-contained-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
