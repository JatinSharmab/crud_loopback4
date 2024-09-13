import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';

interface Option {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value?: string | number;
  options: Option[];
  register: ReturnType<UseFormRegister<any>>;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface DynamicSelectProps {
  selectFields: SelectFieldProps[];
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({ selectFields }) => {
  return (
    <Box>
      {selectFields.map((field, index) => (
        <TextField
          key={index}
          select
          label={field.label}
          placeholder={field.placeholder}
          value={field.value}
          {...field.register}
          onChange={field.onChange}
          sx={{
            '.MuiFilledInput-root': {
              bgcolor: 'grey.A100',
              ':hover': {
                bgcolor: 'background.default',
              },
              ':focus': {
                bgcolor: 'background.default',
              },
              ':focus-within': {
                bgcolor: 'background.default',
              },
              padding: '16px',
            },
            borderRadius: 2,
            width: '100%',
            marginBottom: '16px',
          }}
          error={!!field.error}
          helperText={field.error || ''}
        >
          {field.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      ))}
    </Box>
  );
};

export default DynamicSelect;



// import React from "react";
// import { Box, TextField, MenuItem } from "@mui/material";
// import { UseFormRegister } from "react-hook-form";

// interface Option {
//   value: string | number;
//   label: string;
// }

// interface SelectFieldProps {
//   label: string;
//   name: string;
//   placeholder: string;
//   value: string | number;
//   options: Option[];
//   register: any;
//   error?: string;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const mySelect: React.FC<SelectFieldProps> = ({
//   label,
//   name,
//   placeholder,
//   value,
//   options,
//   onChange,
//   register,
// }) => {
//   return (
//     <Box>
//       <TextField
//         select
//         label={label}
//         placeholder={placeholder}
//         value={value}
//         {...register(name)}
//         onChange={onChange}
//         sx={{
//           ".MuiFilledInput-root": {
//             bgcolor: "grey.A100",
//             ":hover": {
//               bgcolor: "background.default",
//             },
//             ":focus": {
//               bgcolor: "background.default",
//             },
//             ":focus-within": {
//               bgcolor: "background.default",
//             },
//             padding: "16px",
//           },
//           borderRadius: 2,
//           width: "100%",
//           marginBottom: "16px",
//         }}
//       >
//         {options.map((option) => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </TextField>
//     </Box>
//   );
// };

// export default mySelect;
