import {
    Box,
    Link,
    Paper,
    Stack,
    Button,
    TextField,
    IconButton,
    Divider,
    Typography,
    InputAdornment,
    Snackbar,
    Alert,
    Avatar,
  } from '@mui/material';
  import IconifyIcon from 'components/base/IconifyIcon';
  import { useState, ReactElement, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useForm } from 'react-hook-form';
  import { rootPaths } from 'routes/paths';
  import Image from 'components/base/Image';
  import logoWithText from '/Logo-with-text.png';
  import './style.css';
import MyInput from "components/common/myInput";

  
  const UpdateProfile = (): ReactElement => {
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState<string>('');
    const [userData, setUserData] = useState<any>({});
    const [success, setSuccess] = useState<boolean>(false);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
      watch,
    } = useForm();
  
    useEffect(() => {
      // Fetch user data from API and set initial state
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost/em_management/api/v1/user/profile/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          const result = await response.json();
  
          if (response.ok) {
            setUserData(result);
            setProfilePicture(result.profilePicture);
          } else {
            setError('server', { message: 'Failed to fetch profile data. Please try again.' });
          }
        } catch (error: any) {
          setError('server', { message: error.message });
        }
      };
  
      fetchData();
    }, [setError]);
  
    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) setProfilePicture(e.target.result as string);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    };
  
    const onSubmit = async (data: any) => {
      try {
        const response = await fetch('http://localhost/em_management/api/v1/user/update/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            profilePicture: profilePicture,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          setSuccess(true);
          setTimeout(() => {
            navigate('/profile');
          }, 2000);
        } else {
          setError('server', { message: 'Failed to update profile. Please try again.' });
        }
      } catch (error: any) {
        setError('server', { message: error.message });
      }
    };
  
    const onChangePassword = async (data: any) => {
      try {
        const response = await fetch('http://localhost/em_management/api/v1/user/change-password/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          setSuccess(true);
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
              Update Profile
            </Typography>
            <Box display="flex" justifyContent="center" mb={3}>
              <Avatar src={profilePicture} sx={{ width: 100, height: 100 }} />
            </Box>
            <Button
              variant="contained"
              component="label"
              sx={{
                mb: 3,
                display: 'block',
                mx: 'auto',
                bgcolor: 'grey.A100',
                ':hover': {
                  bgcolor: 'background.default',
                },
              }}
            >
              Change Profile Picture
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleProfilePictureChange}
              />
            </Button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Name"
                type="text"
                placeholder="Enter Name"
                {...register('name', { required: 'Name is required' })}
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
                  minWidth: '100%',
                  marginBottom: '16px',
                }}
                error={!!errors.name}
                helperText={errors.name ? String(errors.name.message) : ''}
              />
              <TextField
                label="Email"
                type="text"
                placeholder="Enter Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                    message: 'Please enter a valid Gmail address',
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
                  minWidth: '100%',
                  marginBottom: '16px',
                }}
                error={!!errors.email}
                helperText={errors.email ? String(errors.email.message) : ''}
              />
              <Button
                type="submit"
                sx={{
                  fontWeight: 'fontWeightRegular',
                  bgcolor: 'grey.A100',
                  ':hover': {
                    bgcolor: 'background.default',
                  },
                }}
              >
                Update Profile
              </Button>
            </form>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h5" textAlign="center" color="text.secondary">
              Change Password
            </Typography>
            <form onSubmit={handleSubmit(onChangePassword)}>
              <TextField
                label="Current Password"
                type="password"
                placeholder="Enter Current Password"
                {...register('currentPassword', {
                  required: 'Current password is required',
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
                  minWidth: '100%',
                  marginBottom: '16px',
                }}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword ? String(errors.currentPassword.message) : ''}
              />
              <TextField
                label="New Password"
                type="password"
                placeholder="Enter New Password"
                {...register('newPassword', {
                  required: 'New password is required',
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
                    message: 'Password must be at least 6 characters long and contain at least one letter and one number.',
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
                  minWidth: '100%',
                  marginBottom: '16px',
                }}
                error={!!errors.newPassword}
                helperText={errors.newPassword ? String(errors.newPassword.message) : ''}
              />
              <TextField
                label="Confirm New Password"
                type="password"
                placeholder="Confirm New Password"
                {...register('confirmNewPassword', {
                  required: 'Confirm new password is required',
                  validate: (value) => value === watch('newPassword') || 'Passwords do not match',
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
                  minWidth: '100%',
                  marginBottom: '16px',
                }}
                error={!!errors.confirmNewPassword}
                helperText={errors.confirmNewPassword ? String(errors.confirmNewPassword.message) : ''}
              />
              <Button
                type="submit"
                sx={{
                  
                  fontWeight: 'fontWeightRegular',
                  bgcolor: 'grey.A100',
                  ':hover': {
                    bgcolor: 'background.default',
                  },
                }}
              >
                Change Password
              </Button>
            </form>
          </Stack>
        </Paper>
        {success && (
          <Snackbar open={success} autoHideDuration={6000}>
            <Alert severity="success" sx={{ width: '100%' }}>
              Update successful! Redirecting...
            </Alert>
          </Snackbar>
        )}
      </div>
    );
  };
  
  export default UpdateProfile;
  