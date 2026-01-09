import { Search, Menu, X, Bell, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { session } = useAuth();

    const handleUserClick = () => {
        if (session) {
            navigate('/admin');
        } else {
            navigate('/admin/login');
        }
    };

    return (
        <header className="sticky top-0 z-50 glass-card-dark border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <img
                            src="/images/logo-full.png"
                            alt="NipponLife"
                            className="h-10 w-auto"
                        />
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-xl">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar notícias, vagas, eventos..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="input-search pl-12"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-xl hover:bg-white/10 transition-colors relative">
                            <Bell className="w-5 h-5 text-white/70" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-nippon-red rounded-full"></span>
                        </button>
                        <button
                            onClick={handleUserClick}
                            className="hidden sm:flex items-center gap-2 p-2 rounded-xl hover:bg-white/10 transition-colors"
                        >
                            <User className="w-5 h-5 text-white/70" />
                        </button>
                        <button
                            className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <X className="w-5 h-5 text-white/70" />
                            ) : (
                                <Menu className="w-5 h-5 text-white/70" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Search Bar - Mobile */}
                <div className="mt-4 md:hidden">
                    <div className="relative w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="input-search pl-12"
                        />
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav className="mt-4 md:hidden animate-slide-up">
                        <ul className="flex flex-col gap-2">
                            {['News', 'Jobs', 'Events', 'Business', 'Influencers', 'Community'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className="block px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        handleUserClick();
                                    }}
                                    className="block w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                                >
                                    Login / Admin
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}
