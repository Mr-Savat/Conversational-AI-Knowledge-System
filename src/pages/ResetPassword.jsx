import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a session (should have from recovery link)
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // No session, redirect to auth
        console.log('No session found, redirecting to auth');
        navigate('/auth');
      }
    };
    checkSession();
  }, [navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!newPassword.trim()) {
      setError('Please enter a new password');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      setSuccess(true);
      // Sign out after password change to force new login
      await supabase.auth.signOut();
      setTimeout(() => navigate('/auth'), 3000);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafc] dark:bg-black p-4">
      <div className="max-w-md w-full bg-white dark:bg-[#1c1c1e] rounded-2xl p-8 shadow-xl">
        <button
          onClick={() => navigate('/auth')}
          className="flex items-center gap-2 text-[13px] text-[#8e8e93] hover:text-[#0071e3] mb-6"
        >
          <ArrowLeft size={16} /> Back to Login
        </button>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#1d1d1f] dark:text-white">
            Create New Password
          </h1>
          <p className="text-[13px] text-[#8e8e93] mt-2">
            Enter your new password below
          </p>
        </div>

        {success ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <p className="text-[15px] text-green-600 dark:text-green-400 font-medium">
              Password updated successfully!
            </p>
            <p className="text-[13px] text-[#8e8e93] mt-2">
              Redirecting to login...
            </p>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[12px] font-medium text-[#8e8e93] ml-1">
                New Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8e8e93]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-white dark:bg-[#1c1c1e] border border-black/8 dark:border-white/8 rounded-xl focus:border-[#0071e3] focus:outline-none focus:ring-1 focus:ring-[#0071e3]/20 transition-all text-[15px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e8e93] hover:text-[#0071e3] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[12px] font-medium text-[#8e8e93] ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8e8e93]" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-[#1c1c1e] border border-black/8 dark:border-white/8 rounded-xl focus:border-[#0071e3] focus:outline-none focus:ring-1 focus:ring-[#0071e3]/20 transition-all text-[15px]"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-3">
                <p className="text-[12px] text-red-600 dark:text-red-400 text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl font-medium text-[15px] transition-all active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;