import { Sparkles, TrendingUp, Flame } from 'lucide-react';
import { NewsItem } from '../api';

interface HeroSectionProps {
    featuredNews: NewsItem[];
}

export function HeroSection({ featuredNews }: HeroSectionProps) {
    const mainFeature = featuredNews[0];
    const secondaryFeature = featuredNews[1];

    if (!mainFeature) return null;

    return (
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Title */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nippon-red to-sakura flex items-center justify-center">
                        <Flame className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="section-title mb-0">Em Destaque</h2>
                        <p className="text-white/50 text-sm">As principais notícias de hoje</p>
                    </div>
                </div>

                {/* Featured Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Main Feature */}
                    <div className="glass-card overflow-hidden hover-lift group cursor-pointer h-full">
                        <div className="relative h-full">
                            <img
                                src={mainFeature.image}
                                alt={mainFeature.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            <div className="absolute top-4 left-4 flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full bg-nippon-red text-white text-xs font-medium flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    Destaque
                                </span>
                                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                                    {mainFeature.category}
                                </span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <p className="text-white/60 text-sm mb-2">{new Date(mainFeature.date).toLocaleDateString('pt-BR')}</p>
                                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 text-shadow">
                                    {mainFeature.title}
                                </h3>
                                <p className="text-white/80 text-sm md:text-base line-clamp-2">{mainFeature.summary}</p>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Feature + Quick Stats */}
                    <div className="flex flex-col gap-6">
                        {secondaryFeature && (
                            <div className="glass-card overflow-hidden hover-lift group cursor-pointer flex-1">
                                <div className="relative h-full min-h-[200px]">
                                    <img
                                        src={secondaryFeature.image}
                                        alt={secondaryFeature.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                    <div className="absolute top-4 left-4 flex items-center gap-2">
                                        <span className="px-3 py-1 rounded-full bg-sakura-dark text-white text-xs font-medium flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" />
                                            Trending
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="text-white/60 text-xs mb-1">{new Date(secondaryFeature.date).toLocaleDateString('pt-BR')}</p>
                                        <h3 className="font-display text-lg md:text-xl font-bold text-white mb-2 text-shadow">
                                            {secondaryFeature.title}
                                        </h3>
                                        <p className="text-white/70 text-sm line-clamp-2">{secondaryFeature.summary}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="glass-card p-4 text-center hover-lift">
                                <p className="font-display text-2xl font-bold gradient-text">5K+</p>
                                <p className="text-white/50 text-xs">Vagas</p>
                            </div>
                            <div className="glass-card p-4 text-center hover-lift">
                                <p className="font-display text-2xl font-bold gradient-text">120+</p>
                                <p className="text-white/50 text-xs">Eventos</p>
                            </div>
                            <div className="glass-card p-4 text-center hover-lift">
                                <p className="font-display text-2xl font-bold gradient-text">50K+</p>
                                <p className="text-white/50 text-xs">Membros</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
