import {
  Box,
  Link,
  Paper,
  Stack,
  Button,
  Divider,
  Snackbar,
  Alert,
  Checkbox,
  FormGroup,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import IconifyIcon from "components/base/IconifyIcon";
import { useState, ReactElement, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "axios";
import useAxios from "axiosConfig";
import { rootPaths } from "routes/paths";
import { useForm } from "react-hook-form";
import Image from "components/base/Image";
import logoWithText from "/Logo-with-text.png";
import "./style.css";
import MyButton from "components/common/button";
import MyInput from "components/common/myInput";
import { signInSchema } from "components/common/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {useUser} from "components/context/context";
const Login = (): ReactElement => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const {setUsername} = useUser();
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  
  const onSubmit = async (data: any) => {
    try {
      const response = await axiosInstance.post("/signin/", {
        userEmail: data.email,
        userPassword: data.password,
      });

      const result = response.data;
      console.log(result, "login res");

      if (response.status === 200) {
        console.log("Login successful", result);

        localStorage.setItem("Token", result.data.Token);
        navigate("/profile");
      } else {
        setLoginFailed(true);
        console.error("Login failed", result);
      }
    } catch (error) {
      setLoginFailed(true);
      console.error("An error occurred", error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="main">
      <Box component="figure" mb={5} mx="auto" textAlign="center">
        <Link href={rootPaths.homeRoot}>
          <Image src={logoWithText} alt="logo with text" height={60} />
        </Link>
      </Box>
      <Paper
        sx={{
          py: 6,
          px: { xs: 5, sm: 7.5 },
        }}
      >
        <Stack justifyContent="center" gap={5}>
          <Typography variant="h3" textAlign="center" color="text.secondary">
            Log In
          </Typography>
          <Typography
            variant="h6"
            fontWeight={500}
            textAlign="center"
            color="text.primary"
          >
            Don’t have an account?{" "}
            <Link href="/authentication/sign-up" underline="none">
              Sign up
            </Link>
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
         
            <MyInput
              label="Email"
              placeholder="Enter Email"
              type="text"
              name="email"
              register={register}
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px", 
                },
                borderRadius: 2,
                minWidth: "100%", 
                marginBottom: "7px",
              }}
            ></MyInput>
            <Typography color="error" variant="body2" marginLeft={3}>
              {errors.email ? String(errors.email.message) : ""}
            </Typography>
            
            <MyInput
            
              label="Password"
              placeholder="Enter Password"
              type="password"
              name="password"
              register={register}
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                minWidth: "100%",
                marginBottom: "7px",
              }}
              showPassword={showPassword}
              onTogglePasswordVisibility={handleClickShowPassword}
            />
            <Typography color="error" variant="body2" marginLeft={3}>
              {errors.password ? String(errors.password.message) : ""}
            </Typography>
            <Box
              sx={{
                fontWeight: "fontWeightRegular",
                marginTop: "5px",
              }}
            >
              <MyButton type="submit" text="Log In"></MyButton>
            </Box>

            <Snackbar
              open={loginFailed}
              autoHideDuration={6000}
              onClose={() => setLoginFailed(false)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert onClose={() => setLoginFailed(false)} severity="error">
                Invalid email or password!
              </Alert>
            </Snackbar>
          </form>

          <Divider />
        </Stack>
      </Paper>
    </div>
  );
};

export default Login;
