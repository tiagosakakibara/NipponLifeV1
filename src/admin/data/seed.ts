import { AdminCategory, AdminPost } from './types';

export const INITIAL_CATEGORIES: AdminCategory[] = [
    { key: 'cultura', label: 'Cultura', sort_order: 1, is_active: true },
    { key: 'tecnologia', label: 'Tecnologia', sort_order: 2, is_active: true },
    { key: 'gastronomia', label: 'Gastronomia', sort_order: 3, is_active: true },
    { key: 'entretenimento', label: 'Entretenimento', sort_order: 4, is_active: true },
    { key: 'vagas', label: 'Vagas', sort_order: 5, is_active: true },
];

export const INITIAL_POSTS: AdminPost[] = [
    {
        id: '1',
        title: 'Festival de Sakura 2026 Acontece em Abril',
        slug: 'festival-de-sakura-2026',
        categoryKey: 'cultura',
        language: 'pt',
        excerpt: 'O tradicional festival da flor de cerejeira retorna com programação especial este ano.',
        content: '<p>Conteúdo completo sobre o festival de Sakura...</p>',
        coverImageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop',
        status: 'published',
        publishedAt: '2026-01-07T10:00:00Z',
        createdAt: '2026-01-07T09:00:00Z',
        updatedAt: '2026-01-07T10:00:00Z',
    },
    {
        id: '2',
        title: 'Nova Linha de Trem-Bala Conecta Tóquio a Osaka',
        slug: 'novo-shinkansen-tokyo-osaka',
        categoryKey: 'tecnologia',
        language: 'pt',
        excerpt: 'Tecnologia inovadora reduz tempo de viagem para apenas 2 horas.',
        content: '<p>O novo modelo N700S Extreme promete revolucionar...</p>',
        coverImageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
        status: 'published',
        publishedAt: '2026-01-06T15:30:00Z',
        createdAt: '2026-01-06T14:00:00Z',
        updatedAt: '2026-01-06T15:30:00Z',
    }
];
