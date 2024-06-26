import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import {
  Link,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import { useSnackbar } from "notistack";
import { login } from "src/DAL/auth";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleChange = (e) => {
    const { target } = e;
    setFormInputs({ ...formInputs, [target.name]: target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    formData.append("email", formInputs.email);
    formData.append("password", formInputs.password);

    const result = await login(formData);
    if (result.status == true) {
      localStorage.setItem("token", result.token);
      localStorage.setItem(`user_data`, JSON.stringify(result.user));

      console.log(result.token, "hdjsfgjdgsjfgjd");
      enqueueSnackbar(result.message, { variant: "success" });
      setIsLoading(false);

      navigate("/dashboard");
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          value={formInputs.email}
          onChange={handleChange}
          name="email"
          required
          fullWidth
          autoComplete="username"
          type="email"
          label="Email address"
        />

        <TextField
          value={formInputs.password}
          onChange={handleChange}
          fullWidth
          name="password"
          required
          autoComplete="current-password"
          type={showPassword ? "text" : "password"}
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Link
          component={RouterLink}
          variant="subtitle2"
          to="/forgot-password"
          underline="hover"
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
      >
        {isLoading == true ? "Login.." : "Login"}
      </LoadingButton>
    </form>
  );
}
