import { Calendar, MapPin, Star, Users, Briefcase, BadgeCheck } from 'lucide-react';
import type {
    NewsItem,
    JobItem,
    EventItem,
    BusinessItem,
    InfluencerItem,
    CommunityItem
} from '../api/mockData';

// News Card
interface NewsCardProps {
    item: NewsItem;
    featured?: boolean;
}

export function NewsCard({ item, featured }: NewsCardProps) {
    return (
        <div className={`carousel-item ${featured ? 'w-80 md:w-96' : 'w-72'}`}>
            <div className="glass-card overflow-hidden hover-lift h-full">
                <div className="relative">
                    <img src={item.image} alt={item.title} className="card-image" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-nippon-red/90 text-white text-xs font-medium">
                        {item.category}
                    </span>
                </div>
                <div className="p-4">
                    <p className="text-white/50 text-xs mb-2">{new Date(item.date).toLocaleDateString('pt-BR')}</p>
                    <h3 className="font-display font-semibold text-white mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-white/70 text-sm line-clamp-2">{item.summary}</p>
                </div>
            </div>
        </div>
    );
}

// Job Card
interface JobCardProps {
    item: JobItem;
    featured?: boolean;
}

export function JobCard({ item, featured }: JobCardProps) {
    return (
        <div className={`carousel-item ${featured ? 'w-80 md:w-96' : 'w-72'}`}>
            <div className="glass-card p-5 hover-lift h-full">
                <div className="flex items-start gap-4">
                    <img src={item.logo} alt={item.company} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-white truncate">{item.title}</h3>
                        <p className="text-sakura text-sm">{item.company}</p>
                    </div>
                </div>
                <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Briefcase className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.type}</span>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-sakura font-semibold text-sm">{item.salary}</p>
                </div>
            </div>
        </div>
    );
}

// Event Card
interface EventCardProps {
    item: EventItem;
    featured?: boolean;
}

export function EventCard({ item, featured }: EventCardProps) {
    return (
        <div className={`carousel-item ${featured ? 'w-80 md:w-96' : 'w-72'}`}>
            <div className="glass-card overflow-hidden hover-lift h-full">
                <div className="relative">
                    <img src={item.image} alt={item.title} className="card-image" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-sakura-dark/90 text-white text-xs font-medium">
                        {item.category}
                    </span>
                </div>
                <div className="p-4">
                    <h3 className="font-display font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/70 text-sm mb-3 line-clamp-2">{item.description}</p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(item.date).toLocaleDateString('pt-BR')} • {item.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate">{item.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Business Card
interface BusinessCardProps {
    item: BusinessItem;
    featured?: boolean;
}

export function BusinessCard({ item, featured }: BusinessCardProps) {
    return (
        <div className={`carousel-item ${featured ? 'w-80 md:w-96' : 'w-72'}`}>
            <div className="glass-card overflow-hidden hover-lift h-full">
                <div className="relative">
                    <img src={item.image} alt={item.name} className="card-image" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                        {item.category}
                    </span>
                </div>
                <div className="p-4">
                    <h3 className="font-display font-semibold text-white mb-1">{item.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-white font-medium text-sm">{item.rating}</span>
                        </div>
                        <span className="text-white/50 text-sm">({item.reviews} avaliações)</span>
                    </div>
                    <p className="text-white/70 text-sm mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Influencer Card
interface InfluencerCardProps {
    item: InfluencerItem;
    featured?: boolean;
}

export function InfluencerCard({ item, featured }: InfluencerCardProps) {
    return (
        <div className={`carousel-item ${featured ? 'w-64' : 'w-56'}`}>
            <div className="glass-card p-5 hover-lift h-full text-center">
                <div className="relative inline-block mb-4">
                    <img src={item.avatar} alt={item.name} className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-sakura/30" />
                    {item.verified && (
                        <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                            <BadgeCheck className="w-4 h-4 text-white" />
                        </div>
                    )}
                </div>
                <h3 className="font-display font-semibold text-white">{item.name}</h3>
                <p className="text-sakura text-sm mb-2">{item.handle}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs mb-3">
                    {item.category}
                </span>
                <p className="text-white/50 text-sm">
                    <span className="text-white font-semibold">{item.followers}</span> seguidores
                </p>
            </div>
        </div>
    );
}

// Community Card
interface CommunityCardProps {
    item: CommunityItem;
    featured?: boolean;
}

export function CommunityCard({ item, featured }: CommunityCardProps) {
    return (
        <div className={`carousel-item ${featured ? 'w-80 md:w-96' : 'w-72'}`}>
            <div className="glass-card overflow-hidden hover-lift h-full">
                <div className="relative">
                    <img src={item.image} alt={item.title} className="card-image" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-2">
                            {item.category}
                        </span>
                        <h3 className="font-display font-semibold text-white text-shadow">{item.title}</h3>
                    </div>
                </div>
                <div className="p-4">
                    <p className="text-white/70 text-sm mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{item.members.toLocaleString('pt-BR')} membros</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
