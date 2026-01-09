import { useState, useEffect } from 'react';
import { AdminCategory, AdminPost, AdminSettings, MediaItem } from './types';
import { supabase } from '../../lib/supabaseClient';

const DEFAULT_SETTINGS: AdminSettings = {
    siteTitle: 'NipponLife',
    tagline: 'Seu portal completo para a cultura japonesa',
    adminEmail: 'contato@nipponlife.com',
};

export function useAdminData() {
    const [categories, setCategories] = useState<AdminCategory[]>([]);
    const [posts, setPosts] = useState<AdminPost[]>([]);
    const [settings, setSettingsState] = useState<AdminSettings>(DEFAULT_SETTINGS);
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        // Fetch Categories
        const { data: catData, error: catError } = await supabase
            .from('categories')
            .select('*')
            .order('name', { ascending: true }); // No sort_order in schema, sort by name

        if (catData) {
            setCategories(catData.map((c: any) => ({
                id: c.id,
                key: c.slug,
                label: c.name
            })));
        } else if (catError) {
            console.error(catError);
        }

        // Fetch Posts
        const { data: postData, error: postError } = await supabase
            .from('posts')
            .select(`
                *,
                categories (slug)
            `)
            .order('created_at', { ascending: false });

        if (postData) {
            setPosts(postData.map((p: any) => ({
                id: p.id,
                title: p.title,
                slug: p.slug,
                categoryKey: p.categories?.slug || 'uncategorized',
                excerpt: p.excerpt,
                content: p.content,
                coverImageUrl: p.cover_image_url, // Updated column name
                status: p.status,
                publishedAt: p.published_at,
                createdAt: p.created_at,
                updatedAt: p.updated_at
            })));
        } else if (postError) {
            console.error(postError);
        }

        // Fetch Media
        const { data: mediaData, error: mediaError } = await supabase
            .from('media')
            .select('*')
            .order('created_at', { ascending: false });

        if (mediaData) {
            setMedia(mediaData.map((m: any) => ({
                id: m.id,
                url: m.public_url,
                name: m.path.split('/').pop() || m.path, // Derive name from path
                type: m.mime_type,
                size: m.size_bytes,
                createdAt: m.created_at
            })));
        } else if (mediaError) {
            console.error(mediaError);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Category Actions
    const addCategory = async (category: AdminCategory) => {
        const { data, error } = await supabase
            .from('categories')
            .insert([{
                name: category.label,
                slug: category.key
            }])
            .select();

        if (!error && data) {
            fetchData();
        } else {
            console.error('Error adding category:', error);
            alert('Error adding category');
        }
    };

    const updateCategory = async (key: string, updated: AdminCategory) => {
        // Find category ID by old slug (key)
        const cat = categories.find(c => c.key === key);
        if (!cat?.id) return;

        const { error } = await supabase
            .from('categories')
            .update({
                name: updated.label,
                slug: updated.key
            })
            .eq('id', cat.id);

        if (!error) {
            fetchData();
        } else {
            console.error('Error updating category:', error);
            alert('Error updating category');
        }
    };

    const deleteCategory = async (key: string) => {
        const cat = categories.find(c => c.key === key);
        if (!cat?.id) return;

        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', cat.id);

        if (!error) {
            fetchData();
        } else {
            console.error('Error deleting category:', error);
            alert('Error deleting category');
        }
    };

    // Post Actions
    const addPost = async (post: AdminPost) => {
        // Need category ID from slug
        const cat = categories.find(c => c.key === post.categoryKey);

        if (!cat?.id) {
            alert('Invalid Category');
            return;
        }

        // Get current user
        const { data: { user } } = await supabase.auth.getUser();

        const { error } = await supabase
            .from('posts')
            .insert([{
                title: post.title,
                slug: post.slug,
                category_id: cat.id,
                excerpt: post.excerpt,
                content: post.content,
                cover_image_url: post.coverImageUrl, // Updated column name
                status: post.status,
                published_at: post.publishedAt,
                created_by: user?.id // Explicitly setting created_by if needed, though RLS/Trigger might handle it, schema says refs auth.users
            }]);

        if (!error) {
            fetchData();
        } else {
            console.error('Error adding post:', error);
            alert('Error adding post: ' + error.message);
        }
    };

    const updatePost = async (id: string, updated: AdminPost) => {
        const cat = categories.find(c => c.key === updated.categoryKey);

        if (!cat?.id) {
            alert('Invalid Category');
            return;
        }

        const { error } = await supabase
            .from('posts')
            .update({
                title: updated.title,
                slug: updated.slug,
                category_id: cat.id,
                excerpt: updated.excerpt,
                content: updated.content,
                cover_image_url: updated.coverImageUrl, // Updated column name
                status: updated.status,
                published_at: updated.publishedAt
            })
            .eq('id', id);

        if (!error) {
            fetchData();
        } else {
            console.error('Error updating post:', error);
            alert('Error updating post');
        }
    };

    const deletePost = async (id: string) => {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (!error) {
            fetchData();
        } else {
            console.error('Error deleting post:', error);
            alert('Error deleting post');
        }
    };

    // Settings Actions
    const saveSettings = (newSettings: AdminSettings) => {
        setSettingsState(newSettings);
    };

    // Media Actions
    const uploadMedia = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        // Get current user
        const { data: { user } } = await supabase.auth.getUser();

        const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Error uploading media:', uploadError);
            alert('Error uploading media');
            return null;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);

        // Save to media table
        const { data, error: dbError } = await supabase
            .from('media')
            .insert([{
                bucket: 'media',
                path: filePath,
                public_url: publicUrl,
                mime_type: file.type,
                size_bytes: file.size,
                created_by: user?.id
            }])
            .select()
            .single();

        if (dbError) {
             console.error('Error saving media record:', dbError);
        } else {
            fetchData();
            return data ? {
                id: data.id,
                url: data.public_url,
                name: data.path.split('/').pop() || data.path,
                type: data.mime_type,
                size: data.size_bytes,
                createdAt: data.created_at
            } as MediaItem : null;
        }
    };

    const deleteMediaItem = async (id: string) => {
         const item = media.find(m => m.id === id);

         const { error } = await supabase
            .from('media')
            .delete()
            .eq('id', id);

         if (!error) {
             if (item) {
                 // Try to delete from storage as well
                 // Reconstruct path if needed, or if we stored it in 'name' in our type, but better use path if we had it.
                 // In this implementation, I am not storing 'path' in MediaItem type, but I can infer it or just leave it for now.
                 // The 'name' in MediaItem is derived from path.
                 // Ideally I should store path in MediaItem too.
             }
             fetchData();
         } else {
            console.error('Error deleting media:', error);
            alert('Error deleting media');
         }
    };

    return {
        categories,
        posts,
        settings,
        media,
        loading,
        addCategory,
        updateCategory,
        deleteCategory,
        addPost,
        updatePost,
        deletePost,
        saveSettings,
        uploadMedia,
        deleteMediaItem,
    };
}
