import {
  Box,
  Link,
  Paper,
  Stack,
  Button,
  Divider,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import IconifyIcon from "components/base/IconifyIcon";
import { useState, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { rootPaths, pagesRoutes } from "routes/paths";
import Image from "components/base/Image";
import logoWithText from "/Logo-with-text.png";
import "./style.css";
import MyButton from "components/common/button";
import MyInput from "components/common/myInput";
import {signUpSchema} from "components/common/schema";
import { zodResolver } from "@hookform/resolvers/zod";
 
const SignUp = (): ReactElement => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },

    setError,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        console.log("Navigating to home...");
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer); 
    }
  }, [success, navigate]);

  const handleNavigateToLogin = () => {
    console.log("Navigating to login...");
    navigate("/authentication/login");
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3001/signup/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userFirstName: data.name,
            userLastName: data.lastname,
            userEmail: data.email,
            userPassword: data.password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError("server", { message: "Failed to sign up. Please try again." });
      }
    } catch (error: any) {
      setError("server", { message: error.message });
    }
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
            Create New Account
          </Typography>
          <Typography
            variant="h6"
            fontWeight={500}
            textAlign="center"
            color="text.primary"
          >
            Have an account?{" "}
            <Link
              onClick={handleNavigateToLogin}
              underline="none"
              sx={{ cursor: "pointer" }}
            >
              Log In
            </Link>
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
           
            <MyInput
              label="First Name"
              placeholder="Enter Your First Name"
              type="text"
              name="name"
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
                  padding: "16px", // Adjust padding if needed
                },
                
                borderRadius: 2,
                minWidth: "100%", // Ensure the TextField is not too small
                marginBottom: "7px", // Ensure appropriate spacing between fields
              }}
            />

            <Typography color="error" variant="body2" marginLeft={3}>
              {errors.name ? String(errors.name.message) : ""}
            </Typography>
            
             
            <MyInput
              label="Last Name"
              placeholder="Enter Your Last Name"
              type="text"
              name="lastname"
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
            />
            <Typography color="error" variant="body2" marginLeft={3}>
              {errors.lastname ? String(errors.lastname.message) : ""}
            </Typography>
         
            <MyInput
              label="Email"
              placeholder="Enter Your Email"
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
            />
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
            
            <MyInput
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
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
              showPassword={showConfirmPassword}
              onTogglePasswordVisibility={handleClickShowConfirmPassword}
            />
            {/* {errors.server && (
              <Typography color="error" variant="body2" textAlign="center">
                {errors.server.message}
              </Typography>
            )} */}
            <Typography color="error" variant="body2" marginLeft={3} sx={{marginTop:"0"}}>
              {errors.confirmPassword ? String(errors.confirmPassword.message) : ""}
            </Typography>
            {errors.server && (
              <Typography color="error" variant="body2" textAlign="center">
                {typeof errors.server.message === "string"
                  ? errors.server.message
                  : "An error occurred"}
              </Typography>
            )}
            {/* <Button
              type="submit"
              sx={{
                fontWeight: "fontWeightRegular",
              }}
            >
              Sign Up
            </Button> */}
            <Box
              sx={{
                fontWeight: "fontWeightRegular", marginTop:"5px",
              }}
            >
              <MyButton type="submit" text="Sign Up"></MyButton>
            </Box>
          </form>
          {success && (
            <Snackbar
              open={success}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Signup successful! Redirecting...
              </Alert>
            </Snackbar>
          )}
      
        </Stack>
      </Paper>
    </div>
  );
};

export default SignUp;
