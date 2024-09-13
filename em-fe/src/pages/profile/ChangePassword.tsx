
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
  } from '@mui/material';
  import { useState, ReactElement, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useForm } from 'react-hook-form';
  import { rootPaths } from 'routes/paths';
  import Image from 'components/base/Image';
  import logoWithText from '/Logo-with-text.png';
import { json } from 'stream/consumers';
import MyButton from 'components/common/button';
  
  const ChangePassword = (): ReactElement => {
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState<string>('');
    const [userData, setUserData] = useState<any>({});
    const [success, setSuccess] = useState<boolean>(false);
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState<boolean>(false);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      setError,
      reset, // This will be used to reset form values once data is fetched
    } = useForm();
  
   
 
  
    const onChangePassword = async (data: any) => {
      try {
        const token = localStorage.getItem('Token');
        const response = await fetch('http://localhost/em_management/api/v1/myprofile/change-password/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`,
          },
          body: JSON.stringify({
            newPassword: data.newPassword,
            comfirmPassword: data.comfirmPassword,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          setPasswordChangeSuccess(true);
          setTimeout(() => {
            navigate('/profile');
          }, 2000);
        } else {
          setError('server', { message: 'Failed to change password. Please try again.' });
        }
      } catch (error: any) {
        setError('server', { message: error.message });
      }
    };
  
    return (
      <Box className="main" sx={{ width: '90vw', minHeight: '50vh', bgcolor: 'background.default', p: 3 }}>
        <Box component="figure" mb={5} mx="auto" textAlign="center" width="100%">
          <Link href={rootPaths.homeRoot}>
            <Image src={logoWithText} alt="logo with text" height={60} />
          </Link>
        </Box>
        <Paper
          sx={{
            width: '100%',
            py: 6,
            px: { xs: 2, sm: 4, md: 6 },
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <Stack justifyContent="center" gap={5} width="100%">
            <Typography variant="h3" textAlign="center" color="text.secondary">
              Update Profile
            </Typography>
            
                 <form onSubmit={handleSubmit(onChangePassword)}>
              <Typography variant="h6" textAlign="center" mb={3} color="text.secondary">
                Change Password
              </Typography>
              <TextField
                label="New Password"
                type="password"
                placeholder="Enter New Password"
               {...register("newPassword", {
                required: "New Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters long and contain at least one letter and one number.",
                },
              })}
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
                error={!!errors.newPassword}
                helperText={errors.newPassword ? String(errors.newPassword.message) : ''}
              />
              <TextField
                label="Confirm Password"
                type="password"
                placeholder="Enter Confirm Password"
                {...register("comfirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                  
                })}
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
                error={!!errors.comfirmPassword}
                helperText={errors.comfirmPassword ? String(errors.comfirmPassword.message) : ''}
              />
              {/* {JSON.stringify(value)} */}
              {/* <Button
                type="submit"
                variant="contained"
                sx={{
                  width: '100%',
                  py: 2,
                  mt: 4,
                  fontWeight: 'fontWeightRegular',
                }}
              >
                
                Change Password
              </Button> */}
              <Box sx={{
                  width: '100%',
                  py: 2,
                  mt: 4,
                  fontWeight: 'fontWeightRegular',
                }}>
              <MyButton type='submit' text='Change Password'></MyButton>
              </Box>
            </form>
          </Stack>
        </Paper>
      </Box>
    );
  };
  
  export default ChangePassword;
  