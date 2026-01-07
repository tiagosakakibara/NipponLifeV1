import { Heart } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-white/10 mt-12">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nippon-red to-sakura flex items-center justify-center">
                                <span className="text-white font-bold text-xl">日</span>
                            </div>
                            <h2 className="font-display font-bold text-xl gradient-text">NipponLife</h2>
                        </div>
                        <p className="text-white/60 text-sm mb-4 max-w-md">
                            Seu portal completo para a cultura japonesa. Conectando pessoas através de notícias,
                            oportunidades de trabalho, eventos e uma comunidade vibrante.
                        </p>
                        <p className="text-white/40 text-xs flex items-center gap-1">
                            Feito com <Heart className="w-3 h-3 text-nippon-red fill-nippon-red" /> no Brasil e Japão
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-display font-semibold text-white mb-4">Navegação</h3>
                        <ul className="space-y-2">
                            {['News', 'Jobs', 'Events', 'Business', 'Influencers', 'Community'].map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        className="text-white/60 hover:text-sakura transition-colors text-sm"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-display font-semibold text-white mb-4">Contato</h3>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li>contato@nipponlife.com</li>
                            <li>+81 03-1234-5678</li>
                            <li>Shibuya, Tokyo, Japan</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-xs">
                        © 2026 NipponLife. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">
                            Privacidade
                        </a>
                        <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">
                            Termos de Uso
                        </a>
                        <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
