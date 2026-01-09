export type PostStatus = 'draft' | 'published';

export interface AdminCategory {
    id?: string;
    key: string; // slug
    label: string; // name
    // sort_order and is_active removed as per new schema
}

export interface AdminPost {
    id: string;
    title: string;
    slug: string;
    categoryKey: string; // derived from category_id -> slug
    excerpt: string;
    content: string;
    coverImageUrl?: string; // mapped from cover_image_url
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
    url: string; // public_url
    name: string; // path or filename derived
    type: string; // mime_type
    size: number; // size_bytes
    createdAt: string;
}
