// @mui
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Container,
  Typography,
  IconButton,
  CardContent,
  Box,
  Card,
  CardMedia,
  CircularProgress,
} from "@mui/material";
// components
import SummaryCard from "./components/SummaryCard";
import { Page } from "src/components";
//hooks
import { useAppContext } from "src/hooks";
import { useEffect, useState } from "react";
import PendingAdminOrder from "src/components/dashboard/AdminOrder";
import PendingSellerOrder from "src/components/dashboard/SellerOrderPending";
import Chart from "./charts/chart";
import PieChart from "./charts/chart2";
import Chart2 from "./charts/chart2";
import { AllUsers } from "src/DAL/Users/User";
import { AllProducts } from "src/DAL/Products/Product";

// ----------------------------------------------------------------------

export default function Dashboard() {
  const theme = useTheme();
  const { _get_user_profile } = useAppContext();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [seller, setSeller] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    const resp = await AllUsers();
    if (resp.status == true) {
      console.log(resp, "hjgfdjhsgjfhjkdsf");
      setUser(resp?.users);
      setLoading(false);
    }
  };

  const getProducts = async () => {
    const resp2 = await AllProducts();
    if (resp2.status == true) {
      console.log(resp2, "sdfgsdgfjsdj");
      setProducts(resp2?.products);
    }
  };

  useEffect(() => {
    getUser();
    getProducts();

    const adminOrder = JSON.parse(localStorage.getItem("adminorder"));
    setAdmin(adminOrder);
    const sellerOrder = JSON.parse(localStorage.getItem("sellerorder"));
    setSeller(sellerOrder);
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

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
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <SummaryCard
                  color={"success"}
                  title={"Users"}
                  count={user?.length}
                  icon={"fa6-solid:users"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SummaryCard
                  color={"primary"}
                  title={"Products"}
                  count={products?.length}
                  icon={"fluent-mdl2:product-variant"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SummaryCard
                  color={"info"}
                  title={"Admin Order"}
                  count={admin?.length}
                  icon={"dashicons:admin-users"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SummaryCard
                  color={"warning"}
                  title={"Seller Order"}
                  count={seller?.length}
                  icon={"heroicons:currency-dollar-solid"}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                sx={{ marginTop: "20px" }}
                className="chart"
              >
                <Card
                  sx={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    mb: 1,
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 2, mt: 2, mx: 4 }}>
                    Sales
                  </Typography>

                  <Chart
                    users={user?.length}
                    product={products?.length}
                    adminOrder={admin?.length}
                    sellerOrder={seller?.length}
                  />
                </Card>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                sx={{ marginTop: "20px" }}
                className="chart"
              >
                <Card
                  sx={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    mb: 1,
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 2, mt: 2, mx: 4 }}>
                    Orders
                  </Typography>

                  <Chart2 />
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={6} className="mt-0">
                <PendingAdminOrder />
              </Grid>
              <Grid item xs={12} sm={6} md={6} className="mt-0">
                <PendingSellerOrder />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Page>
  );
}
