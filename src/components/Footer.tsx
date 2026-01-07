import { Heart } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-white/10 mt-12">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Conteúdo principal */}
                <div className="flex flex-col items-center text-center gap-6">
                    {/* Logo */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nippon-red to-sakura flex items-center justify-center">
                            <span className="text-white font-bold text-xl">日</span>
                        </div>
                        <h2 className="font-display font-bold text-xl gradient-text">
                            NipponLife
                        </h2>
                    </div>

                    {/* Descrição */}
                    <p className="text-white/60 text-sm max-w-md">
                        Seu portal completo para a cultura japonesa. Conectando pessoas através
                        de notícias, oportunidades de trabalho, eventos e uma comunidade vibrante.
                    </p>

                    {/* Feito com amor */}
                    <p className="text-white/40 text-xs flex items-center gap-1">
                        Feito com <Heart className="w-3 h-3 text-nippon-red fill-nippon-red" /> no Brasil e Japão
                    </p>

                    {/* Contato */}
                    <div className="pt-4">
                        <p className="text-white/60 text-sm">contato@nipponlife.com</p>
                    </div>
                </div>

                {/* Linha inferior */}
                <div className="border-t border-white/10 mt-8 pt-6 text-center">
                    <p className="text-white/40 text-xs mb-3">
                        © 2026 NipponLife. Todos os direitos reservados.
                    </p>

                    <div className="flex justify-center gap-6">
                        <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">
                            Privacidade
                        </a>
                        <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">
                            Termos
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
