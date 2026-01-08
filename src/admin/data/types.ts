export type PostStatus = 'draft' | 'published';

export interface AdminCategory {
    key: string;
    label: string;
    sort_order: number;
    is_active: boolean;
    icon?: string;
}

export interface AdminPost {
    id: string;
    title: string;
    slug: string;
    categoryKey: string;
    language: 'pt' | 'jp' | 'en';
    excerpt: string;
    content: string;
    coverImageUrl?: string;
    status: PostStatus;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdminSettings {
    siteTitle: string;
    tagline: string;
    adminEmail: string;
}

export interface MediaItem {
    id: string;
    url: string; // base64 or external url
    name: string;
    type: string;
    size: number;
    createdAt: string;
}
