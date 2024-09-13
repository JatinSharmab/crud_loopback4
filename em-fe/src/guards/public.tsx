

import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const Public = (): ReactElement => {
  const token = localStorage.getItem('Token');

  if (token) {
    
        return <Navigate to="/profile" replace />;
      }
   
  return <Outlet />;
};

export default Public;



