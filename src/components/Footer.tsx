import { Heart } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-white/10 mt-12">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Main content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nippon-red to-sakura flex items-center justify-center">
                                <span className="text-white font-bold text-xl">日</span>
                            </div>
                            <h2 className="font-display font-bold text-xl gradient-text">
                                NipponLife
                            </h2>
                        </div>

                        <p className="text-white/60 text-sm max-w-md">
                            Seu portal completo para a cultura japonesa.
                        </p>

                        <p className="text-white/40 text-xs flex items-center gap-1 mt-3">
                            Feito com
                            <Heart className="w-3 h-3 text-nippon-red fill-nippon-red" />
                            Time NipponLife
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="md:text-right">
                        <h3 className="font-display font-semibold text-white mb-2">
                            Contato
                        </h3>
                        <a
                            href="mailto:contato@nipponlife.com"
                            className="text-white/60 hover:text-white transition-colors text-sm"
                        >
                            contato@nipponlife.com
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-white/40 text-xs">
                        © 2026 NipponLife. Todos os direitos reservados.
                    </p>

                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="text-white/40 hover:text-white text-xs transition-colors"
                        >
                            Privacidade
                        </a>
                        <a
                            href="#"
                            className="text-white/40 hover:text-white text-xs transition-colors"
                        >
                            Termos
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
