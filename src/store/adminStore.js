// import { create } from 'zustand';
// import { supabase } from '../services/supabase';

// export const useAdminStore = create((set, get) => ({
//   user: null,
//   session: null,
//   isAuthenticated: false,
//   isAuthLoading: true,
//   authError: null,

//   // Initialize auth - call this on app start
//   initAuth: async () => {
//     set({ isAuthLoading: true });

//     // Get current session
//     const { data: { session } } = await supabase.auth.getSession();

//     if (session) {
//       set({
//         user: session.user,
//         session,
//         isAuthenticated: true,
//         isAuthLoading: false,
//       });
//     } else {
//       set({
//         user: null,
//         session: null,
//         isAuthenticated: false,
//         isAuthLoading: false,
//       });
//     }

//     // Listen for auth changes
//     supabase.auth.onAuthStateChange((_event, session) => {
//       if (session) {
//         set({
//           user: session.user,
//           session,
//           isAuthenticated: true,
//           authError: null,
//         });
//       } else {
//         set({
//           user: null,
//           session: null,
//           isAuthenticated: false,
//         });
//       }
//     });
//   },

//   // Sign Up
//   signUp: async (email, password, name) => {
//     set({ authError: null, isAuthLoading: true });

//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: { name, role: 'user' },
//         },
//       });

//       if (error) throw error;

//       // Create user profile in your custom table (optional)
//       if (data.user) {
//         await supabase.from('profiles').insert({
//           id: data.user.id,
//           email,
//           name,
//           role: 'user',
//           created_at: new Date().toISOString(),
//         });
//       }

//       set({
//         user: data.user,
//         session: data.session,
//         isAuthenticated: !!data.session,
//         authError: null,
//         isAuthLoading: false,
//       });

//       return { success: true, data };
//     } catch (error) {
//       set({ authError: error.message, isAuthLoading: false });
//       return { success: false, error: error.message };
//     }
//   },

//   // Sign In
//   signIn: async (email, password) => {
//     set({ authError: null, isAuthLoading: true });

//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) throw error;

//       set({
//         user: data.user,
//         session: data.session,
//         isAuthenticated: true,
//         authError: null,
//         isAuthLoading: false,
//       });

//       return { success: true, data };
//     } catch (error) {
//       set({ authError: error.message, isAuthLoading: false });
//       return { success: false, error: error.message };
//     }
//   },

//   // Sign In with Google
//   signInWithGoogle: async () => {
//     set({ authError: null, isAuthLoading: true });

//     try {
//       const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: `${window.location.origin}/admin`,
//         },
//       });

//       if (error) throw error;

//       return { success: true, data };
//     } catch (error) {
//       set({ authError: error.message, isAuthLoading: false });
//       return { success: false, error: error.message };
//     }
//   },

//   // Sign Out
//   signOut: async () => {
//     set({ isAuthLoading: true });

//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;

//       set({
//         user: null,
//         session: null,
//         isAuthenticated: false,
//         authError: null,
//         isAuthLoading: false,
//       });

//       return { success: true };
//     } catch (error) {
//       set({ authError: error.message, isAuthLoading: false });
//       return { success: false, error: error.message };
//     }
//   },
// }));



import { create } from 'zustand';
import { supabase } from '../services/supabase';

export const useAdminStore = create((set, get) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  isAuthLoading: true,
  authError: null,

  // Initialize auth - call this on app start
  initAuth: async () => {
    set({ isAuthLoading: true });

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // Fetch user profile from profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, name, avatar_url')
          .eq('id', session.user.id)
          .single();

        // Merge auth user with profile data
        const userWithProfile = {
          ...session.user,
          user_metadata: {
            ...session.user.user_metadata,
            role: profile?.role || 'user',
            name: profile?.name || session.user.user_metadata?.name || session.user.email?.split('@')[0],
            avatar_url: profile?.avatar_url,
          }
        };

        set({
          user: userWithProfile,
          session,
          isAuthenticated: true,
          isAuthLoading: false,
        });
      } else {
        set({
          user: null,
          session: null,
          isAuthenticated: false,
          isAuthLoading: false,
        });
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session) {
          // Fetch profile on auth change
          const { data: profile } = await supabase
            .from('profiles')
            .select('role, name, avatar_url')
            .eq('id', session.user.id)
            .single();

          const userWithProfile = {
            ...session.user,
            user_metadata: {
              ...session.user.user_metadata,
              role: profile?.role || 'user',
              name: profile?.name || session.user.user_metadata?.name || session.user.email?.split('@')[0],
              avatar_url: profile?.avatar_url,
            }
          };

          set({
            user: userWithProfile,
            session,
            isAuthenticated: true,
            authError: null,
          });
        } else {
          set({
            user: null,
            session: null,
            isAuthenticated: false,
          });
        }
      });

    } catch (error) {
      console.error('Auth init error:', error);
      set({ isAuthLoading: false, isAuthenticated: false });
    }
  },

  getUserRole: async () => {
    const { user } = get();
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data?.role || 'user';
    } catch (error) {
      console.error('Error fetching user role:', error);
      return 'user';
    }
  },


  // Sign Up
  // In adminStore.js - replace your signUp function with this
  signUp: async (email, password, name) => {
    set({ authError: null, isAuthLoading: true });

    try {
      // Sign up with Supabase Auth - store name in metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            full_name: name,
          },
        },
      });

      if (error) throw error;

      // Update user metadata with the name
      if (data.user) {
        await supabase.auth.updateUser({
          data: { name: name, full_name: name }
        });
      }

      set({
        user: data.user,
        session: data.session,
        isAuthenticated: !!data.session,
        authError: null,
        isAuthLoading: false,
      });

      return { success: true, data };

    } catch (error) {
      console.error('Sign up error:', error);
      set({ authError: error.message, isAuthLoading: false });
      return { success: false, error: error.message };
    }
  },

  // Sign In
  signIn: async (email, password) => {
    set({ authError: null, isAuthLoading: true });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      set({
        user: data.user,
        session: data.session,
        isAuthenticated: true,
        authError: null,
        isAuthLoading: false,
      });

      return { success: true, data };
    } catch (error) {
      set({ authError: error.message, isAuthLoading: false });
      return { success: false, error: error.message };
    }
  },

  // Sign In with Google
  // In adminStore.js
  signInWithGoogle: async () => {
    set({ authError: null, isAuthLoading: true });

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;

      // The page will redirect automatically
      return { success: true, data };
    } catch (error) {
      set({ authError: error.message, isAuthLoading: false });
      return { success: false, error: error.message };
    }
  },

  // Sign Out
  // signOut: async () => {
  //   set({ isAuthLoading: true });

  //   try {
  //     const { error } = await supabase.auth.signOut();
  //     if (error) throw error;

  //     set({
  //       user: null,
  //       session: null,
  //       isAuthenticated: false,
  //       authError: null,
  //       isAuthLoading: false,
  //     });

  //     return { success: true };
  //   } catch (error) {
  //     set({ authError: error.message, isAuthLoading: false });
  //     return { success: false, error: error.message };
  //   }
  // },


  signOut: async () => {
    set({ isAuthLoading: true });
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear all state
      set({
        user: null,
        session: null,
        isAuthenticated: false,
        authError: null,
        isAuthLoading: false,
      });
      
      return { success: true };
      
    } catch (error) {
      console.error('Sign out error:', error);
      set({ 
        authError: error.message, 
        isAuthLoading: false 
      });
      return { success: false, error: error.message };
    }
  },

// Update password after reset
updatePassword: async (newPassword) => {
  set({ authError: null, isAuthLoading: true });
  
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) throw error;
    
    set({ isAuthLoading: false });
    return { success: true };
    
  } catch (error) {
    set({ authError: error.message, isAuthLoading: false });
    return { success: false, error: error.message };
  }
},


// Reset password
resetPassword: async (email) => {
  set({ authError: null, isAuthLoading: true });
  
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    });
    
    if (error) throw error;
    
    set({ isAuthLoading: false });
    return { success: true };
    
  } catch (error) {
    set({ authError: error.message, isAuthLoading: false });
    return { success: false, error: error.message };
  }
},

setAuthError: (error) => set({ authError: error }),
}));