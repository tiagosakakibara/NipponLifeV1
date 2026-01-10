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
const mapPostToItem = (post: any): any => {
    // Handle categories whether it's an object or array (Supabase quirks)
    const categoryData = Array.isArray(post.categories) ? post.categories[0] : post.categories;
    const categoryName = categoryData?.name || 'Geral';
    const categorySlug = categoryData?.slug || 'geral';

    return {
        id: post.id,
        title: post.title,
        summary: post.excerpt || '',
        description: post.excerpt || '',
        image: post.cover_image_url || '',
        category: categoryName,
        categorySlug: categorySlug, // internal use for filtering
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
    };
};

import { useAuth } from '../contexts/AuthContext';

export function HomePage() {
    const { loading: authLoading } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            if (authLoading) {
                console.log('--- fetchPosts WAITING for Auth ---');
                return;
            }

            console.log('--- fetchPosts START ---');
            try {
                setLoading(true);

                // TEST: Try a direct fetch to verify network connectivity
                console.log('Testing connectivity to Supabase URL...');
                try {
                    const testResp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/posts?select=count`, {
                        headers: { 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY }
                    });
                    console.log('Network Test Result:', testResp.status, testResp.statusText);
                } catch (netErr) {
                    console.error('Network Test FAILED:', netErr);
                }

                console.log('Fetching posts from Supabase table: posts');
                const { data, error } = await supabase
                    .from('posts')
                    .select('id, title, status, created_at')
                    .eq('status', 'published')
                    .limit(5); // Just 5 to be fast

                if (error) {
                    console.error('Supabase error fetching posts:', error);
                    return;
                }

                console.log('Basic fetch success, found:', data?.length);

                const { data: fullData, error: fullError } = await supabase
                    .from('posts')
                    .select(`
                        *,
                        categories (name, slug)
                    `)
                    .eq('status', 'published')
                    .order('created_at', { ascending: false });

                if (fullError) {
                    console.error('Error fetching full post data:', fullError);
                } else {
                    console.log('Full fetch success:', fullData?.length);
                    setPosts(fullData || []);
                }
            } catch (err) {
                console.error('Fatal error in fetchPosts:', err);
            } finally {
                console.log('--- fetchPosts END ---');
                setLoading(false);
            }
        };

        fetchPosts();
    }, [authLoading]);

    // Filter posts by category slug and cast to specific type
    const getPostsByCategory = <T,>(slug: string): T[] => {
        // We use the raw post's category data for filtering logic
        // But since we are mapping later, we can also map first then filter.
        // However, the helper function uses `posts` (which are raw db objects).

        return posts
            .filter(p => {
                const categoryData = Array.isArray(p.categories) ? p.categories[0] : p.categories;
                // If categories is null/undefined, categoryData might be null
                // We must handle that.
                if (!categoryData) {
                    // If no category, treat as 'news' (default)
                    return slug === 'news';
                }
                return categoryData.slug === slug;
            })
            .map(mapPostToItem) as T[];
    };

    const newsItems = getPostsByCategory<NewsItem>('news');
    const jobItems = getPostsByCategory<JobItem>('jobs');
    const eventItems = getPostsByCategory<EventItem>('events');
    const businessItems = getPostsByCategory<BusinessItem>('business');
    const influencerItems = getPostsByCategory<InfluencerItem>('influencers');
    const communityItems = getPostsByCategory<CommunityItem>('communities');

    // Debug logs for categories
    useEffect(() => {
        if (!loading && posts.length > 0) {
            console.group('Homepage Category Counts');
            console.log('News:', newsItems.length);
            console.log('Jobs:', jobItems.length);
            console.log('Events:', eventItems.length);
            console.log('Business:', businessItems.length);
            console.log('Influencers:', influencerItems.length);
            console.log('Communities:', communityItems.length);
            console.groupEnd();
        }
    }, [loading, posts]);

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

    // Safety fallback: If it's still loading after 5 seconds, force it to false
    useEffect(() => {
        const timer = setTimeout(() => {
            if (loading) {
                console.warn('Safety timeout: Force-setting loading to false after 5 seconds.');
                setLoading(false);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [loading]);

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
                    {filteredNews.length > 0 ? (
                        filteredNews.map(item => (
                            <NewsCard key={item.id} item={item} featured={item.featured} />
                        ))
                    ) : (
                        <div className="text-gray-400 text-sm py-4 px-2">Nenhuma notícia encontrada.</div>
                    )}
                </Carousel>

                {/* Jobs Section */}
                <Carousel
                    title="Vagas de Emprego"
                    icon={<Briefcase className="w-5 h-5" />}
                    sectionId="jobs"
                >
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map(item => (
                            <JobCard key={item.id} item={item} featured={item.featured} />
                        ))
                    ) : (
                        <div className="text-gray-400 text-sm py-4 px-2">Nenhuma vaga encontrada.</div>
                    )}
                </Carousel>

                {/* Events Section */}
                <Carousel
                    title="Eventos"
                    icon={<Calendar className="w-5 h-5" />}
                    sectionId="events"
                >
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(item => (
                            <EventCard key={item.id} item={item} featured={item.featured} />
                        ))
                    ) : (
                        <div className="text-gray-400 text-sm py-4 px-2">Nenhum evento encontrado.</div>
                    )}
                </Carousel>

                {/* Business Section */}
                <Carousel
                    title="Negócios"
                    icon={<Building2 className="w-5 h-5" />}
                    sectionId="business"
                >
                    {filteredBusinesses.length > 0 ? (
                        filteredBusinesses.map(item => (
                            <BusinessCard key={item.id} item={item} featured={item.featured} />
                        ))
                    ) : (
                        <div className="text-gray-400 text-sm py-4 px-2">Nenhum negócio encontrado.</div>
                    )}
                </Carousel>

                {/* Influencers Section */}
                <Carousel
                    title="Influenciadores"
                    icon={<Heart className="w-5 h-5" />}
                    sectionId="influencers"
                >
                    {filteredInfluencers.length > 0 ? (
                        filteredInfluencers.map(item => (
                            <InfluencerCard key={item.id} item={item} featured={item.featured} />
                        ))
                    ) : (
                        <div className="text-gray-400 text-sm py-4 px-2">Nenhum influenciador encontrado.</div>
                    )}
                </Carousel>

                {/* Community Section */}
                <Carousel
                    title="Comunidades"
                    icon={<Users className="w-5 h-5" />}
                    sectionId="community"
                >
                    {filteredCommunities.length > 0 ? (
                        filteredCommunities.map(item => (
                            <CommunityCard key={item.id} item={item} featured={item.featured} />
                        ))
                    ) : (
                        <div className="text-gray-400 text-sm py-4 px-2">Nenhuma comunidade encontrada.</div>
                    )}
                </Carousel>
            </main>

            <Footer />
        </div>
    );
}
