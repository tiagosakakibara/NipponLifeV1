import { useState, useEffect } from 'react';
import { AdminCategory, AdminPost, AdminSettings, MediaItem } from './types';
import { storage } from './storage';
import { INITIAL_CATEGORIES, INITIAL_POSTS } from './seed';

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

    useEffect(() => {
        const isInitialized = localStorage.getItem('nl_admin_initialized');

        // Load or Init Categories
        let storedCategories = storage.getCategories();
        if (!isInitialized && storedCategories.length === 0) {
            console.log('[SEED] Initializing Categories...');
            storage.saveCategories(INITIAL_CATEGORIES);
            storedCategories = INITIAL_CATEGORIES;
        }
        setCategories(storedCategories);

        // Load or Init Posts
        let storedPosts = storage.getPosts();
        if (!isInitialized && storedPosts.length === 0) {
            console.log('[SEED] Initializing Posts...');
            storage.savePosts(INITIAL_POSTS);
            storedPosts = INITIAL_POSTS;
        }
        setPosts(storedPosts);

        if (!isInitialized) {
            localStorage.setItem('nl_admin_initialized', 'true');
        }

        // Load Settings
        const storedSettings = storage.getSettings();
        if (storedSettings) {
            setSettingsState(storedSettings);
        } else {
            storage.saveSettings(DEFAULT_SETTINGS);
        }

        // Load Media
        setMedia(storage.getMedia());
    }, []);

    // Category Actions
    const addCategory = (category: AdminCategory) => {
        const newList = [...categories, category];
        setCategories(newList);
        storage.saveCategories(newList);
    };

    const updateCategory = (key: string, updated: AdminCategory) => {
        const newList = categories.map(c => c.key === key ? updated : c);
        setCategories(newList);
        storage.saveCategories(newList);
    };

    const deleteCategory = (key: string) => {
        const updatedList = storage.deleteCategory(key);
        setCategories(updatedList);
    };

    // Post Actions
    const addPost = (post: AdminPost) => {
        const newList = [post, ...posts];
        setPosts(newList);
        storage.savePosts(newList);
    };

    const updatePost = (id: string, updated: AdminPost) => {
        const newList = posts.map(p => p.id === id ? updated : p);
        setPosts(newList);
        storage.savePosts(newList);
    };

    const deletePost = (id: string) => {
        const updatedList = storage.deletePost(id);
        setPosts(updatedList);
    };

    // Settings Actions
    const saveSettings = (newSettings: AdminSettings) => {
        setSettingsState(newSettings);
        storage.saveSettings(newSettings);
    };

    // Media Actions
    const addMediaItem = (item: MediaItem) => {
        const newList = [item, ...media];
        setMedia(newList);
        storage.saveMedia(newList);
    };

    const deleteMediaItem = (id: string) => {
        const updatedList = storage.deleteMedia(id);
        setMedia(updatedList);
    };

    return {
        categories,
        posts,
        settings,
        media,
        addCategory,
        updateCategory,
        deleteCategory,
        addPost,
        updatePost,
        deletePost,
        saveSettings,
        addMediaItem,
        deleteMediaItem,
    };
}
