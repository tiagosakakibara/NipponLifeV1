import { useState } from 'react';
import {
    Newspaper,
    Briefcase,
    Calendar,
    Building2,
    Users,
    Heart
} from 'lucide-react';
import {
    Header,
    Carousel,
    HeroSection,
    Footer,
    NewsCard,
    JobCard,
    EventCard,
    BusinessCard,
    InfluencerCard,
    CommunityCard
} from './components';
import {
    mockNews,
    mockJobs,
    mockEvents,
    mockBusinesses,
    mockInfluencers,
    mockCommunities
} from './api/mockData';

function App() {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter function for search
    const filterBySearch = <T extends { title?: string; name?: string; description?: string; summary?: string }>(
        items: T[]
    ): T[] => {
        if (!searchQuery.trim()) return items;
        const query = searchQuery.toLowerCase();
        return items.filter(item =>
            item.title?.toLowerCase().includes(query) ||
            item.name?.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query) ||
            item.summary?.toLowerCase().includes(query)
        );
    };

    const filteredNews = filterBySearch(mockNews);
    const filteredJobs = filterBySearch(mockJobs);
    const filteredEvents = filterBySearch(mockEvents);
    const filteredBusinesses = filterBySearch(mockBusinesses);
    const filteredInfluencers = filterBySearch(mockInfluencers);
    const filteredCommunities = filterBySearch(mockCommunities);

    const featuredNews = mockNews.filter(n => n.featured);

    return (
        <div className="min-h-screen">
            <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

            <main>
                {/* Hero Section with Featured News */}
                {!searchQuery && <HeroSection featuredNews={featuredNews} />}

                {/* News Section */}
                <Carousel
                    title="Notícias"
                    icon={<Newspaper className="w-5 h-5" />}
                    sectionId="news"
                >
                    {filteredNews.map(item => (
                        <NewsCard key={item.id} item={item} featured={item.featured} />
                    ))}
                </Carousel>

                {/* Jobs Section */}
                <Carousel
                    title="Vagas de Emprego"
                    icon={<Briefcase className="w-5 h-5" />}
                    sectionId="jobs"
                >
                    {filteredJobs.map(item => (
                        <JobCard key={item.id} item={item} featured={item.featured} />
                    ))}
                </Carousel>

                {/* Events Section */}
                <Carousel
                    title="Eventos"
                    icon={<Calendar className="w-5 h-5" />}
                    sectionId="events"
                >
                    {filteredEvents.map(item => (
                        <EventCard key={item.id} item={item} featured={item.featured} />
                    ))}
                </Carousel>

                {/* Business Section */}
                <Carousel
                    title="Negócios"
                    icon={<Building2 className="w-5 h-5" />}
                    sectionId="business"
                >
                    {filteredBusinesses.map(item => (
                        <BusinessCard key={item.id} item={item} featured={item.featured} />
                    ))}
                </Carousel>

                {/* Influencers Section */}
                <Carousel
                    title="Influenciadores"
                    icon={<Heart className="w-5 h-5" />}
                    sectionId="influencers"
                >
                    {filteredInfluencers.map(item => (
                        <InfluencerCard key={item.id} item={item} featured={item.featured} />
                    ))}
                </Carousel>

                {/* Community Section */}
                <Carousel
                    title="Comunidades"
                    icon={<Users className="w-5 h-5" />}
                    sectionId="community"
                >
                    {filteredCommunities.map(item => (
                        <CommunityCard key={item.id} item={item} featured={item.featured} />
                    ))}
                </Carousel>
            </main>

            <Footer />
        </div>
    );
}

export default App;
