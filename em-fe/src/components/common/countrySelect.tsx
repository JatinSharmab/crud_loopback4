import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

interface Country {
  countryId: number;
  countryName: string;
}

interface CountrySelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  error?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  register,
  error,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    onSubmit()
    
  }, []);
  const onSubmit = async () => {
    try {
      const token = localStorage.getItem("Token"); // Get the token from storage
      console.log("==============1=================")
      const response = await fetch("http://127.0.0.1:3001/countries/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token}`, // Add the token to the Authorization header
        },
      });
      console.log("==============2=================")

  
      const result = await response.json();
      console.log(result)
      console.log("==============3=================")

      if (response.ok) {
      console.log("==============4=================")

        console.log(result.data.countries)
        setCountries(result.data.data.countries);
        // console.log(data.data, "=================data.data=======================");
        // console.log(data, "=================data=======================");
      } else {
        console.error("Failed to fetch countries:", result.error.message);
      }
    } catch (error: any) {
      console.error("Error fetching countries:", error.message);
    }
  };
  return (
    <Box>
      <TextField
        label="Country"
        select
        value={value}
        {...register("country", { required: "Country is required" })}
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
      >
        {countries.map((country) => (
          <MenuItem key={country.countryId} value={country.countryName}>
            {country.countryName}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default CountrySelect;