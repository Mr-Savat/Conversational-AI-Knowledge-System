// import { Navigate } from 'react-router-dom';
// import { useAdminStore } from '../store/adminStore';

// const ProtectedRoute = ({ children, requireAdmin = false }) => {
//   const { isAuthenticated, isAuthLoading, user } = useAdminStore();
  
//   if (isAuthLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#fafafc] dark:bg-black">
//         <div className="w-8 h-8 border-2 border-[#0071e3] border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }
  
//   if (!isAuthenticated) {
//     return <Navigate to="/auth" replace />;
//   }
  
//   // Optional: Check admin role
//   if (requireAdmin && user?.user_metadata?.role !== 'admin') {
//     return <Navigate to="/" replace />;
//   }
  
//   return children;
// };

// export default ProtectedRoute;

import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAdminStore } from '../store/adminStore';
import { supabase } from '../services/supabase';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, user, isAuthLoading } = useAdminStore();
  const [userRole, setUserRole] = useState(null);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setCheckingRole(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error('Error fetching user role:', error);
          setUserRole('user');
        } else {
          setUserRole(data?.role || 'user');
        }
      } catch (error) {
        console.error('Error checking role:', error);
        setUserRole('user');
      } finally {
        setCheckingRole(false);
      }
    };
    
    checkUserRole();
  }, [user]);

  if (isAuthLoading || checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafc] dark:bg-black">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#0071e3] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[12px] text-[#8e8e93] mt-2">
            {checkingRole ? 'Checking permissions...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  // Check for admin role if required
  if (requireAdmin && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;