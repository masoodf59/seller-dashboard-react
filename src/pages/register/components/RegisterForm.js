import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import { register } from "src/DAL/Register";
import { useSnackbar } from "notistack";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(inputs, "kjsdgfdsjkfgsdjk");
    const formData = new FormData();
    formData.append("username", inputs.name);
    formData.append("email", inputs.email);
    formData.append("phone", inputs.phone);
    formData.append("password", inputs.password);

    const result = await register(formData);
    console.log(result, "sdhfgjdsgf");

    if (result.status == true) {
      enqueueSnackbar(result.message, { variant: "success" });
      navigate("/login");
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            onChange={handleChange}
          />
        </Stack>

        <TextField
          fullWidth
          autoComplete="current-password"
          type="email"
          label="Email address"
          name="email"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          autoComplete="current-password"
          type="number"
          label="Contact"
          name="phone"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? "text" : "password"}
          name="password"
          label="Password"
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          Register
        </LoadingButton>
      </Stack>
    </form>
  );
}
