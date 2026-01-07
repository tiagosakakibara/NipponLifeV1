export interface NewsItem {
    id: string;
    title: string;
    summary: string;
    image: string;
    category: string;
    date: string;
    featured?: boolean;
}

export interface JobItem {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    logo: string;
    featured?: boolean;
}

export interface EventItem {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image: string;
    category: string;
    featured?: boolean;
}

export interface BusinessItem {
    id: string;
    name: string;
    category: string;
    description: string;
    rating: number;
    reviews: number;
    image: string;
    location: string;
    featured?: boolean;
}

export interface InfluencerItem {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    followers: string;
    category: string;
    verified: boolean;
    featured?: boolean;
}

export interface CommunityItem {
    id: string;
    title: string;
    description: string;
    members: number;
    image: string;
    category: string;
    featured?: boolean;
}
