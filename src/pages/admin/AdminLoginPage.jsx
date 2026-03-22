import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Eye, EyeOff, ArrowLeft, Mail, Lock, User, ShieldCheck } from 'lucide-react';
import MetaBalls from '../../components/MetaBalls';
import { useAdminStore } from '../../store/adminStore';

export default function AdminLoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, signUp, isAuthenticated, isAuthLoading, authError } = useAdminStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isAuthLoading) {
      navigate('/admin');
    }
  }, [isAuthenticated, isAuthLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    if (isSignUp && !name.trim()) return;

    setIsSubmitting(true);
    const result = isSignUp
      ? await signUp(email, password, name)
      : await signIn(email, password);

    if (result.success) navigate('/admin');
    setIsSubmitting(false);
  };

  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-white select-none">
      
      {/* ── LEFT PANEL — 50% Simple Form ── */}
      <div className="flex flex-col h-full px-12 lg:px-20 py-10 relative bg-white">
        
        {/* Back Link */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-admin-800 transition-all duration-300"
        >
          <ArrowLeft size={14} />
          Return
        </button>

        <div className="flex-1 flex flex-col justify-center max-w-100 mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-700">
          
          <div className="mb-10 text-center md:text-left">
             <div className="w-12 h-12 rounded-2xl bg-admin-800 flex items-center justify-center mb-6 shadow-xl shadow-admin-800/20">
              <Brain size={24} className="text-white" strokeWidth={2} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-tight">
              {isSignUp ? 'Join the Console' : 'Welcome Back'}
            </h1>
            <p className="text-[11px] font-medium text-gray-400 mt-2 uppercase tracking-[0.2em]">
              Knowledge Management System
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="space-y-1">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-5 py-4 bg-admin-50 border border-transparent rounded-2xl focus:bg-white focus:border-admin-400 transition-all outline-none font-medium text-sm text-gray-900 placeholder:text-gray-400"
                />
              </div>
            )}

            <div className="space-y-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-5 py-4 bg-admin-50 border border-transparent rounded-2xl focus:bg-white focus:border-admin-400 transition-all outline-none font-medium text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-5 py-4 bg-admin-50 border border-transparent rounded-2xl focus:bg-white focus:border-admin-400 transition-all outline-none font-medium text-sm text-gray-900 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-admin-800 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {authError && (
              <p className="text-[11px] font-bold text-red-500 text-center bg-red-50 py-2 rounded-lg animate-pulse">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gray-900 hover:bg-admin-800 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-300 shadow-lg hover:shadow-admin-800/20 disabled:opacity-50 active:scale-[0.98] mt-2"
            >
              {isSubmitting ? 'Authenticating...' : isSignUp ? 'Register Account' : 'Sign In'}
            </button>
          </form>

          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              useAdminStore.getState().authError = null;
            }}
            className="mt-8 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-admin-800 transition-colors text-center"
          >
            {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </button>
        </div>

        <div className="flex items-center gap-2 text-gray-300 justify-center">
          <ShieldCheck size={14} />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Secure Cloud Node</span>
        </div>
      </div>

      {/* ── RIGHT PANEL — 50% MetaBalls ── */}
      <div className="hidden md:block relative bg-admin-950 overflow-hidden h-full">
        <div className="absolute inset-0 opacity-80 scale-110">
          <MetaBalls
            color="#ffffff"
            cursorBallColor="#ffffff"
            cursorBallSize={2}
            ballCount={20}
            animationSize={28}
            enableMouseInteraction
            enableTransparency={true}
            hoverSmoothness={0.15}
            clumpFactor={1}
            speed={0.25}
          />
        </div>
        
        {/* Subtle Branding over animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
                <h2 className="text-white/10 text-8xl font-black uppercase tracking-tighter select-none">RAG</h2>
            </div>
        </div>
      </div>
    </div>
  );
}