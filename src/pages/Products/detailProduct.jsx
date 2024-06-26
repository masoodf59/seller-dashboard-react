import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Iconify } from "src/components";

export default function DetailProduct() {
  const state = useLocation();
  const navigate = useNavigate();
  console.log(state.state, "dhsgfjksdfjk");
  const [data, setData] = useState();
  const handleNav = () => {
    navigate(-1);
  };

  useEffect(() => {
    setData(state?.state);
  }, []);
  return (
    <>
      <div className="container row ">
        <div className="col-lg-12">
          <Stack direction="row">
            <IconButton onClick={handleNav} className="me-1">
              <Iconify icon="ep:back" />
            </IconButton>
            <Typography variant="h4">Product Detail</Typography>
          </Stack>
          <div className="col-lg-12 mt-4">
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                image={data?.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data?.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  ${data?.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data?.description}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
