import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

interface City {
  cityId: number
  cityName: string
}

interface CitySelectProps {
  state: string;
  country: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  error?: string;
}

const CitySelect: React.FC<CitySelectProps> = ({
  state,
  country,
  value,
  onChange,
  register,
  error,
}) => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    onSubmitCities(); // Trigger fetch when `state` changes
  }, [state]);
  
  const onSubmitCities = async () => {
    try {
      if (!state) {
        setCities([]);
        return;
      }
      const token = localStorage.getItem("Token"); // Get the token from storage
      
      console.log("Fetching cities...");
  
      const response = await fetch("http://127.0.0.1:3001/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token}`, // Add the token to the Authorization header

        },
        body: JSON.stringify({ userState: state }), // Sending state in request body
      });
  
      const result = await response.json();
      console.log(result);
  
      if (response.ok) {
        console.log("=====================")
        console.log(result.data.data)
        setCities(result.data.data.cities); // Set cities in your component state
        console.log(result.data);
      } else {
        console.error("Failed to fetch cities:", result.message);
      }
    } catch (error: any) {
      console.error("Error fetching cities:", error.message);
    }
  };
  
  // Reset cities if country changes
  useEffect(() => {
    if (!country) {
      setCities([]);
    }
  }, [country]);
  
  return (
    <Box>
      <TextField
        label="City"
        select
        placeholder="Enter City"
        value={value}
        {...register("city", { required: "City is required" })}
        onChange={onChange}
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
        error={!!error}
        helperText={error || ""}
        disabled={!state}  // Disable if no state is selected
      >
        {cities.map((cities) => (
          <MenuItem key={cities.cityId} value={cities.cityName}>
            {cities.cityName}
          </MenuItem>
        ))}
        {JSON.stringify(cities)}
      </TextField>
    </Box>
  );
};

export default CitySelect;
