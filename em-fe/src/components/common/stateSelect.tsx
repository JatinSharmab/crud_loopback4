import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

interface State {
  stateId: number;
  stateName: string;
}

interface StateSelectProps {
  country: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  error?: string;
}

const StateSelect: React.FC<StateSelectProps> = ({
  country,
  value,
  onChange,
  register,
  error,
}) => {
  const [states, setStates] = useState<State[]>([]);

  useEffect(() => {
    onSubmit();
  }, [country]); // Dependency on country to trigger fetch when it changes
  
  const onSubmit = async () => {
    try {
      const token = localStorage.getItem("Token"); // Get the token from storage
  
      if (!country) {
        setStates([]);
        return;
      }
  
      console.log("==============1=================");
      
      const response = await fetch("http://127.0.0.1:3001/states", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token}`, // Add the token to the Authorization header
        },
        body: JSON.stringify({ userCountry: country }), // Sending the country in request body
      });
  
      console.log("==============2=================");
      
      const result = await response.json();
      console.log(result);
      console.log("==============3=================");
  
      if (response.ok) {
        console.log("==============4=================");
        setStates(result.data.data.states); // Set states in your component state
        console.log(result.data.states);
      } else {
        console.error("Failed to fetch states:", result.message);
      }
    } catch (error: any) {
      console.error("Error fetching states:", error.message);
    }
  };
  
  return (
    <Box>
      <TextField
        label="State"
        select
        placeholder="Enter State"
        value={value}
        {...register("state", { required: "State is required" })}
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
        {states.map((state) => (
          <MenuItem key={state.stateId} value={state.stateName}>
            {state.stateName}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default StateSelect;
