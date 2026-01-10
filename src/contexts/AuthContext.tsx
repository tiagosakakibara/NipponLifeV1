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

            console.log('Role fetched result:', { data, error });
            if (error) {
                console.error('Error fetching role:', error);
                setRole(null);
            } else {
                const finalRole = data?.role || 'editor';
                console.log('Setting user role to:', finalRole);
                setRole(finalRole);
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
                console.log('Waiting for user role with 3s timeout...');
                // Await role fetch, but don't let it hang the app forever
                await Promise.race([
                    fetchRole(currentSession.user.id),
                    new Promise((resolve) => setTimeout(() => {
                        console.warn('Role fetch timed out after 3s');
                        resolve(null);
                    }, 3000))
                ]);
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
