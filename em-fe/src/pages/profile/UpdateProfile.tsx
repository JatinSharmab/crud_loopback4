import {
  Box,
  Link,
  Paper,
  Stack,
  Button,
  TextField,
  Typography,
  Divider,
  Snackbar,
  Alert,
  Avatar,
  MenuItem,
} from "@mui/material";
import { useState, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { rootPaths } from "routes/paths";
import Image from "components/base/Image";
import logoWithText from "/Logo-with-text.png";
import MyButton from "components/common/button";
import MyInput from "components/common/myInput";
import DynamicSelect from "components/common/select";
import CountrySelect from "components/common/countrySelect";
import StateSelect from "components/common/stateSelect";
import CitySelect from "components/common/citySelect";
interface Country {
  country_id: number;
  country_name: string;
}

interface State {
  state_id: number;
  state_name: string;
}

interface City {
  city_id: number;
  city_name: string;
}

const UpdateProfile = (): ReactElement => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [userData, setUserData] = useState<any>({});
  const [success, setSuccess] = useState<boolean>(false);

  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  useEffect(() => {
    getUserProfileData();
  }, []);

  // useEffect(() => {
  //   onSubmitCity();
  // }, [userData.state]); // Dependency on state to trigger fetch when it changes
  
  // const onSubmitCity = async () => {
  //   try {
  //     if (!userData.state) {
  //       setCities([]);
  //       return;
  //     }
  
  //     console.log("Fetching cities...");
  
  //     const response = await fetch("http://127.0.0.1:3001/cities/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ userState: userData.state }), // Sending state in request body
  //     });
  
  //     const result = await response.json();
  //     console.log(result);
  
  //     if (response.ok) {
  //       setCities(result.data); // Set cities in your component state
  //       console.log(result.data);
  //     } else {
  //       console.error("Failed to fetch cities:", result.message);
  //     }
  //   } catch (error: any) {
  //     console.error("Error fetching cities:", error.message);
  //   }
  // };
  
  const getUserProfileData = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://127.0.0.1:3001/user-details/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token}`, // Include the JWT token in the Authorization header
        },
      });

      const result = await response.json();
      console.log(result.data, "dgdergergt");

      if (response.ok) {
        setUserData(result?.data.data.user);
        console.log(result.data.data.user, "userdataaaaaa");
        reset(result?.user); // Reset form values with fetched data
      } else {
        console.error("Failed to fetch profile data");
      }
    } catch (error: any) {
      console.error("Error fetching profile data:", error.message);
    }
  };

  const onSubmitProfileUpdate = async (data: any) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://127.0.0.1:3001/user-details/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          userFirstName: data.userFirstName,
          userLastName: data.userLastName,
          // userEmail: data.userEmail,
          // profilePicture: profilePicture,
          userAge:20,
          userCity: data.city,
          userState: data.state,
          userCountry: data.country,
          userPhone: data.userPhone,
          userGender: data.userGender,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        setError("server", {
          message: "Failed to update profile. Please try again.",
        });
      }
    } catch (error: any) {
      setError("server", { message: error.message });
    }
  };

  return (
    <Box
      className="main"
      sx={{
        width: "90vw",
        minHeight: "50vh",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Box component="figure" mb={5} mx="auto" textAlign="center" width="100%">
        <Link href={rootPaths.homeRoot}>
          <Image src={logoWithText} alt="logo with text" height={60} />
        </Link>
      </Box>
      <Paper
        sx={{
          width: "100%",
          py: 6,
          px: { xs: 2, sm: 4, md: 6 },
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Stack justifyContent="center" gap={5} width="100%">
          <Typography variant="h3" textAlign="center" color="text.secondary">
            Update Profile
          </Typography>
          <Box display="flex" justifyContent="center" mb={3}>
            <Avatar
              src={profilePicture || userData.profilePicture}
              sx={{ width: 100, height: 100 }}
            />
          </Box>
          <Button
            variant="contained"
            component="label"
            sx={{
              mx: "auto",
              fontWeight: "fontWeightRegular",
              maxWidth: "300px",
              width: "100%",
            }}
          >
            Change Profile Picture
            <input
              type="file"
              accept="image/*"
              hidden
              // onChange={handleProfilePictureChange}
            />
          </Button>
          <form onSubmit={handleSubmit(onSubmitProfileUpdate)}>
            <TextField
              label="First Name"
              type="text"
              placeholder="Enter Your First Name"
              value={userData.userFirstName || " "} // Use value to make it controlled
              {...register("userFirstName", { required: "Name is required" })}
              onChange={(e) =>
                setUserData({ ...userData, userFirstName: e.target.value })
              }
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
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.userFirstName}
              helperText={
                errors.userFirstName ? String(errors.userFirstName.message) : ""
              }
            />
            <TextField
              label="Last Name"
              type="text"
              placeholder="Enter Your Last Name"
              value={userData.userLastName} // Use value to make it controlled
              {...register("userLastName", {
                required: "Last name is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, userLastName: e.target.value })
              }
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
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.userLastName}
              helperText={
                errors.userLastName ? String(errors.userLastName.message) : ""
              }
            />
            <TextField
              label="Email"
              type="text"
              placeholder="Enter Email"
              value={userData.userEmail} // Use value to make it controlled
              {...register("userEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: "Please enter a valid Gmail address",
                },
              })}
              onChange={(e) =>
                setUserData({ ...userData, userEmail: e.target.value })
              }
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
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.userEmail}
              helperText={
                errors.userEmail ? String(errors.userEmail.message) : ""
              }
            />
            userEmail
            <TextField
              label="Mobile"
              type="text"
              placeholder="Enter Mobile"
              value={userData.userPhone} // Use value to make it controlled
              {...register("userPhone", {
                required: "Mobile number is required",
                pattern: {
                  value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                  message: "Please enter a valid Mobile Number",
                },
              })}
              onChange={(e) =>
                setUserData({ ...userData, userPhone: e.target.value })
              }
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
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.userPhone}
              helperText={
                errors.userPhone ? String(errors.userPhone.message) : ""
              }
            />
            <DynamicSelect
              selectFields={[
                {
                  label: "Gender",
                  name: "userGender",
                  placeholder: "Enter Gender",
                  value: userData.userGender || " ",
                  options: [
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                  ],
                  register: register("userGender", {
                    required: "Gender is required",
                  }),
                  error: errors.userGender
                    ? String(errors.userGender.message)
                    : "",
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setUserData({
                      ...userData,
                      userGender: event.target.value,
                    });
                  },
                },
              ]}
            />
            <CountrySelect
              value={userData.userCountry || " "}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  country: e.target.value,
                  state: "",
                  city: "",
                })
              }
              register={register}
              error={errors.country ? String(errors.country.message) : ""}
            />
            <StateSelect
              country={userData.country}
              value={userData.state || " "}
              onChange={(e) =>
                setUserData({ ...userData, state: e.target.value, city: "" })
              }
              register={register}
              error={errors.state ? String(errors.state.message) : ""}
            />
            <CitySelect
              state={userData.state}
              country={userData.country} // Pass country to reset cities when it changes
              value={userData.city || ""}
              onChange={(e) =>
                setUserData({ ...userData, city: e.target.value })
              }
              register={register}
              error={errors.city ? String(errors.city.message) : ""}
            />
            <Box
              sx={{
                fontWeight: "fontWeightRegular",
                maxWidth: "300px",
                width: "100%",
                mx: "auto",
              }}
            >
              <MyButton text="Update Profile" type="submit" />
            </Box>
          </form>
        </Stack>
      </Paper>
    </Box>
  );
};

export default UpdateProfile;
