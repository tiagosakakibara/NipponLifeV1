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

    const fetchRole = async (userId: string) => {
        try {
            console.log('Fetching role for user:', userId);
            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', userId)
                .maybeSingle(); // Better than .single() if it might not exist

            if (error) {
                console.error('Error fetching role:', error);
                setRole(null);
            } else {
                setRole(data?.role || 'editor');
            }
        } catch (err) {
            console.error('Catch error fetching role:', err);
            setRole(null);
        }
    };

    const initialize = async () => {
        console.log('--- AuthProvider initialize START ---');
        try {
            setLoading(true);
            const { data: { session: currentSession } } = await supabase.auth.getSession();
            console.log('Session retrieved:', !!currentSession);
            setSession(currentSession);

            if (currentSession?.user?.id) {
                // DON'T await fetchRole here, it will run in background
                fetchRole(currentSession.user.id);
            }
        } catch (error) {
            console.error('Auth initialization error:', error);
        } finally {
            console.log('--- AuthProvider initialize END ---');
            setLoading(false);
        }
    };

    useEffect(() => {
        initialize();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
            console.log('Auth event:', event);
            setSession(currentSession);
            if (currentSession?.user?.id) {
                fetchRole(currentSession.user.id);
            } else {
                setRole(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const refresh = async () => {
        await initialize();
    };

    return (
        <AuthContext.Provider value={{
            session,
            userId: session?.user?.id || null,
            role,
            loading,
            refresh
        }}>
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
