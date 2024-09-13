import { ReactElement, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAxios from 'axiosConfig'; // Ensure correct path
import { useUser } from 'components/context/context'; // Ensure correct path

const Private = (): ReactElement => {
  const token = localStorage.getItem('Token');
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const { setUsername } = useUser();

  useEffect(() => {
    if (token) {
      getUserProfileData();
    } else {
      setLoading(false); 
    }
  }, [token]);

  const getUserProfileData = async () => {
    try {
      const response = await axiosInstance.get('/user-details/');
      const result = await response.data;

      if (response.status === 200) {
        setUsername(result?.user?.firstname); 
      } else {
        console.error('Failed to fetch profile data');
      }
    } catch (error: any) {
      console.error('Error fetching profile data:', error.message);
    } finally {
      setLoading(false); 
    }
  };


  if (!token) {
    return <Navigate to="/" replace />;
  }

  
  if (loading) {
    return <div>Loading...</div>; 
  }

  
  return <Outlet />;
};

export default Private;
