import { useState, useEffect } from 'react';
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
} from '../components';
import { supabase } from '../lib/supabaseClient';
import {
    NewsItem,
    JobItem,
    EventItem,
    BusinessItem,
    InfluencerItem,
    CommunityItem
} from '../api/types';

// Helper to map DB post to UI types (simplified)
const mapPostToItem = (post: any): any => ({
    id: post.id,
    title: post.title,
    summary: post.excerpt || '',
    description: post.excerpt || '',
    image: post.cover_image_url || '',
    category: post.categories?.name || 'Geral',
    date: post.published_at || post.created_at,
    company: 'Unknown',
    location: 'Japan',
    salary: 'N/A',
    type: 'Full Time',
    logo: post.cover_image_url || '',
    time: 'N/A',
    rating: 5.0,
    reviews: 0,
    name: post.title,
    handle: '@unknown',
    avatar: post.cover_image_url || '',
    followers: '0',
    members: 0,
    verified: false,
    featured: false
});

export function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('posts')
                .select(`
                    *,
                    categories (name, slug)
                `)
                .eq('status', 'published')
                .order('created_at', { ascending: false });

            if (data) {
                setPosts(data);
            } else if (error) {
                console.error('Error fetching posts:', error);
            }
            setLoading(false);
        };

        fetchPosts();
    }, []);

    // Filter posts by category slug and cast to specific type
    const getPostsByCategory = <T,>(slug: string): T[] => {
        return posts
            .filter(p => p.categories?.slug === slug)
            .map(mapPostToItem) as T[];
    };

    const newsItems = getPostsByCategory<NewsItem>('news');
    const jobItems = getPostsByCategory<JobItem>('jobs');
    const eventItems = getPostsByCategory<EventItem>('events');
    const businessItems = getPostsByCategory<BusinessItem>('business');
    const influencerItems = getPostsByCategory<InfluencerItem>('influencers');
    const communityItems = getPostsByCategory<CommunityItem>('communities');

    // For featured, just take the top 5 most recent across all categories
    // Mapping to NewsItem as default for HeroSection
    const featuredNews = posts.slice(0, 5).map(mapPostToItem) as NewsItem[];

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

    const filteredNews = filterBySearch(newsItems);
    const filteredJobs = filterBySearch(jobItems);
    const filteredEvents = filterBySearch(eventItems);
    const filteredBusinesses = filterBySearch(businessItems);
    const filteredInfluencers = filterBySearch(influencerItems);
    const filteredCommunities = filterBySearch(communityItems);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

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
