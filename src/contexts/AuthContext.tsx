import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
    session: Session | null;
    userId: string | null;
    role: string | null;
    loading: boolean;
    refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchRole = async (uid: string) => {
        try {
            // Check if user is in admins table
            const { data, error } = await supabase
                .from('admins')
                .select('user_id')
                .eq('user_id', uid)
                .single();

            if (error) {
                // If error (likely row not found), not admin
                setRole(null);
            } else if (data) {
                setRole('admin');
            } else {
                setRole(null);
            }
        } catch (err) {
            console.error('Unexpected error fetching role:', err);
            setRole(null);
        }
    };

    const refresh = async () => {
        setLoading(true);
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        if (currentSession?.user) {
            await fetchRole(currentSession.user.id);
        } else {
            setRole(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        // Initial session check
        refresh();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
            setSession(currentSession);
            if (currentSession?.user) {
                await fetchRole(currentSession.user.id);
            } else {
                setRole(null);
            }
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ session, userId: session?.user?.id || null, role, loading, refresh }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
