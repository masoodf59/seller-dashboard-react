import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AllProducts } from "src/DAL/Products/Product";
import { Iconify } from "src/components";
import { baseUri } from "src/config/config";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllProducts = async () => {
    setLoading(true);
    const resp = await AllProducts();
    if (resp.status == true) {
      setProducts(resp?.products);
      localStorage.setItem("products", JSON.stringify(resp?.products));
      setLoading(false);
    }
  };

  const handleNav = () => {
    navigate("/products/add-product");
  };
  const handleNavigate = (val) => {
    console.log(val, "hjsdgfjgsjkfgkdjs");
    navigate(`/products/detail-product/${val?.id}`, { state: val });
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12"></div>
          <div className="col-lg-6">
            <Typography variant="h4">Products</Typography>
          </div>
          <div className="col-lg-6 text-end">
            <Button
              onClick={handleNav}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Product
            </Button>
          </div>

          {loading == true ? (
            <>
              <Box>
                <CircularProgress
                  sx={{ display: "flex", marginTop: "20%", marginLeft: "50%" }}
                />
              </Box>
            </>
          ) : (
            <>
              {products?.map((val) => {
                return (
                  <>
                    <div className="col-lg-4 cursor-pointer h-100 mt-3">
                      <Card
                        onClick={() => handleNavigate(val)}
                        style={{ cursor: "pointer" }}
                      >
                        <CardMedia sx={{ height: 230 }} image={val?.image} />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {val?.title}
                          </Typography>
                          <Typography gutterBottom variant="h6" component="div">
                            ${val?.price}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
