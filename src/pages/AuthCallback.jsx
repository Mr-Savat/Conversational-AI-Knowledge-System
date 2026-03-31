import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../services/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      // Check if this is a password recovery callback
      const hashParams = new URLSearchParams(location.hash.substring(1));
      const type = hashParams.get('type');
      
      // IMPORTANT: For password recovery, redirect to reset password page
      if (type === 'recovery') {
        // Don't wait for session, immediately redirect to reset password
        navigate('/reset-password', { replace: true });
        return;
      }
      
      // Normal OAuth login or email confirmation
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Auth callback error:', error);
        navigate('/auth?error=oauth_failed');
        return;
      }
      
      if (session) {
        // Success! Redirect to admin
        navigate('/admin');
      } else {
        navigate('/auth');
      }
    };

    handleCallback();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafc] dark:bg-black">
      <div className="text-center">
        <div className="w-10 h-10 border-3 border-[#0071e3] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-[14px] text-[#1d1d1f] dark:text-white font-medium">
          Processing...
        </p>
        <p className="text-[12px] text-[#8e8e93] mt-1">
          Please wait.
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;