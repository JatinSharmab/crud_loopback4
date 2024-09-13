import React, { ChangeEventHandler } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { SxProps } from "@mui/system";
import IconifyIcon from "components/base/IconifyIcon";

interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  name: string;
  register?: any;
  sx?: SxProps;
  showPassword?: boolean;
  onTogglePasswordVisibility?: () => void;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
// myInput.tsx

const MyInput: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  name,
  register,
  sx,
  showPassword,
  onChange,
  onTogglePasswordVisibility,
  value,
  ...rest // Add this to capture all remaining props
}) => {
  return (
    <Box>
      <TextField
        label={label}
        placeholder={placeholder}
        type={type === "password" && showPassword !== undefined ? (showPassword ? "text" : "password") : type}
        name={name}
        value={value}
        {...register(name)}
        onChange={onChange}
        sx={sx}
        InputProps={{
          endAdornment: type === "password" && showPassword !== undefined ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={onTogglePasswordVisibility}
                size="small"
                edge="end"
              >
                {showPassword ? (
                  <IconifyIcon icon="el:eye-open" color="text.secondary" />
                ) : (
                  <IconifyIcon icon="el:eye-close" color="text.primary" />
                )}
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        {...rest} // Spread remaining props here to ensure all handlers are passed down
      />
    </Box>
  );
};
export default MyInput;