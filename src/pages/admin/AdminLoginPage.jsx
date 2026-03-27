import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, ShieldCheck, Sparkles } from 'lucide-react';
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
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-white dark:bg-black select-none">

      {/* ── LEFT PANEL — iPhone Style Login Form ── */}
      <div className="flex flex-col h-full px-8 lg:px-16 py-8 relative bg-white dark:bg-black">

        {/* Back Link - iPhone Style */}
        <button
          onClick={() => navigate('/')}
          className="
    group flex items-center w-fit gap-1 px-3 py-1.5 cursor-pointer rounded-full
    text-[12px] font-medium tracking-tight
    text-[#8e8e93] dark:text-[#98989e]
    hover:text-[#0071e3] dark:hover:text-[#409cff]
    hover:bg-[#0071e3]/5 dark:hover:bg-[#0a84ff]/10
    transition-all duration-300 ease-out
    active:scale-95
  "
        >
          <ArrowLeft
            size={14}
            className="transform group-hover:-translate-x-1 transition-transform duration-300 ease-out"
          />
          <span className="relative">
            Back
          </span>
        </button>
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full animate-fade-in">

          {/* Logo & Title - iPhone Style */}
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-3xl font-semibold text-[#1d1d1f] dark:text-white tracking-tight">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-[13px] text-[#8e8e93] dark:text-[#98989e] mt-1">
              {isSignUp ? 'Start managing your knowledge base' : 'Sign in to continue to your dashboard'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-[12px] font-medium text-[#8e8e93] dark:text-[#98989e] ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8e8e93]" strokeWidth={1.5} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Appleseed"
                    className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-[#1c1c1e] border border-black/8 dark:border-white/8 rounded-xl focus:border-[#0071e3] dark:focus:border-[#0a84ff] focus:outline-none focus:ring-1 focus:ring-[#0071e3]/20 dark:focus:ring-[#0a84ff]/20 transition-all text-[15px] text-[#1d1d1f] dark:text-white placeholder:text-[#8e8e93]"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[12px] font-medium text-[#8e8e93] dark:text-[#98989e] ml-1">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8e8e93]" strokeWidth={1.5} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-[#1c1c1e] border border-black/8 dark:border-white/8 rounded-xl focus:border-[#0071e3] dark:focus:border-[#0a84ff] focus:outline-none focus:ring-1 focus:ring-[#0071e3]/20 dark:focus:ring-[#0a84ff]/20 transition-all text-[15px] text-[#1d1d1f] dark:text-white placeholder:text-[#8e8e93]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[12px] font-medium text-[#8e8e93] dark:text-[#98989e] ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8e8e93]" strokeWidth={1.5} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-white dark:bg-[#1c1c1e] border border-black/8 dark:border-white/8 rounded-xl focus:border-[#0071e3] dark:focus:border-[#0a84ff] focus:outline-none focus:ring-1 focus:ring-[#0071e3]/20 dark:focus:ring-[#0a84ff]/20 transition-all text-[15px] text-[#1d1d1f] dark:text-white placeholder:text-[#8e8e93]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e8e93] hover:text-[#0071e3] dark:hover:text-[#0a84ff] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-3 animate-shake">
                <p className="text-[12px] font-medium text-red-600 dark:text-red-400 text-center">
                  {authError}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 cursor-pointer bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl font-medium text-[15px] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-sm"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </span>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              useAdminStore.getState().authError = null;
            }}
            className="mt-6 text-[13px] cursor-pointer font-medium text-[#0071e3] dark:text-[#0a84ff] hover:opacity-80 transition-colors text-center"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>

        {/* Footer - iPhone Style */}
        <div className="flex items-center justify-center gap-2 text-[#8e8e93] dark:text-[#98989e] mt-6">
          <ShieldCheck size={12} strokeWidth={1.5} />
          <span className="text-[10px] font-medium tracking-tight">Secure Authentication</span>
          <span className="w-1 h-1 rounded-full bg-[#8e8e93]/30 mx-1" />
          <span className="text-[10px] font-medium tracking-tight">Powered by Supabase</span>
        </div>
      </div>

      {/* ── RIGHT PANEL — MetaBalls with iPhone Style ── */}
      <div className="hidden md:block relative bg-linear-to-br from-[#0071e3] to-[#34aadc] overflow-hidden h-full">
        <div className="absolute inset-0 opacity-70">
          <MetaBalls
            color="#ffffff"
            cursorBallColor="#ffffff"
            cursorBallSize={2}
            ballCount={25}
            animationSize={32}
            enableMouseInteraction
            enableTransparency={true}
            hoverSmoothness={0.2}
            clumpFactor={1.2}
            speed={0.3}
          />
        </div>
          {/* iPhone-style overlay text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-center">
            <h2 className="text-white text-3xl font-semibold tracking-tight mb-2">AI Knowledge System</h2>
            <p className="text-white/70 text-[15px] max-w-xs mx-auto">
              Intelligent document retrieval and conversational AI
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <Sparkles size={14} className="text-white/60" />
              <span className="text-white/50 text-[11px] font-medium">RAG Powered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}