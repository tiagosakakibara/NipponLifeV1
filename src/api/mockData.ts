
import type {
    NewsItem,
    JobItem,
    EventItem,
    BusinessItem,
    InfluencerItem,
    CommunityItem,
} from "./types";

export const mockNews: NewsItem[] = [
    {
        id: '1',
        title: 'Festival de Sakura 2026 Acontece em Abril',
        summary: 'O tradicional festival da flor de cerejeira retorna com programação especial este ano.',
        image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop',
        category: 'Cultura',
        date: '2026-01-07',
        featured: true
    },
    {
        id: '2',
        title: 'Nova Linha de Trem-Bala Conecta Tóquio a Osaka',
        summary: 'Tecnologia inovadora reduz tempo de viagem para apenas 2 horas.',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
        category: 'Tecnologia',
        date: '2026-01-06',
        featured: true
    },
    {
        id: '3',
        title: 'Gastronomia Japonesa Recebe 5 Novas Estrelas Michelin',
        summary: 'Restaurantes em Tóquio e Kyoto são reconhecidos internacionalmente.',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=600&fit=crop',
        category: 'Gastronomia',
        date: '2026-01-05'
    },
    {
        id: '4',
        title: 'Anime "Kimetsu no Yaiba" Bate Recorde de Bilheteria',
        summary: 'Novo filme da franquia arrecada 10 bilhões de ienes na primeira semana.',
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=600&fit=crop',
        category: 'Entretenimento',
        date: '2026-01-04'
    },
    {
        id: '5',
        title: 'Exposição de Arte Contemporânea no Museu de Arte Moderna',
        summary: 'Artistas japoneses apresentam obras inspiradas na tradição e modernidade.',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop',
        category: 'Arte',
        date: '2026-01-03'
    }
];

export const mockJobs: JobItem[] = [
    {
        id: '1',
        title: 'Desenvolvedor Full Stack',
        company: 'Sony Interactive',
        location: 'Tóquio, Japão',
        salary: '¥8.000.000 ~ ¥12.000.000',
        type: 'Tempo Integral',
        logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop',
        featured: true
    },
    {
        id: '2',
        title: 'Designer UX/UI Sênior',
        company: 'Nintendo Co.',
        location: 'Kyoto, Japão',
        salary: '¥7.500.000 ~ ¥10.000.000',
        type: 'Tempo Integral',
        logo: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=100&h=100&fit=crop',
        featured: true
    },
    {
        id: '3',
        title: 'Professor de Português',
        company: 'Berlitz Japan',
        location: 'Osaka, Japão',
        salary: '¥4.000.000 ~ ¥5.500.000',
        type: 'Tempo Integral',
        logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=100&h=100&fit=crop'
    },
    {
        id: '4',
        title: 'Engenheiro de Machine Learning',
        company: 'Toyota AI Labs',
        location: 'Nagoya, Japão',
        salary: '¥10.000.000 ~ ¥15.000.000',
        type: 'Tempo Integral',
        logo: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=100&h=100&fit=crop'
    },
    {
        id: '5',
        title: 'Chef de Cozinha Brasileira',
        company: 'Restaurante Samba',
        location: 'Tóquio, Japão',
        salary: '¥5.000.000 ~ ¥7.000.000',
        type: 'Tempo Integral',
        logo: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop'
    }
];

export const mockEvents: EventItem[] = [
    {
        id: '1',
        title: 'Tokyo Game Show 2026',
        description: 'O maior evento de games da Ásia retorna com novidades incríveis.',
        date: '2026-03-15',
        time: '10:00 - 18:00',
        location: 'Makuhari Messe, Chiba',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
        category: 'Games',
        featured: true
    },
    {
        id: '2',
        title: 'Anime Japan 2026',
        description: 'Festival de anime com painéis exclusivos e lançamentos.',
        date: '2026-03-22',
        time: '09:00 - 20:00',
        location: 'Tokyo Big Sight',
        image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&h=600&fit=crop',
        category: 'Anime',
        featured: true
    },
    {
        id: '3',
        title: 'Matsuri da Primavera',
        description: 'Celebração tradicional com danças, comidas típicas e fogos de artifício.',
        date: '2026-04-10',
        time: '16:00 - 22:00',
        location: 'Parque Ueno, Tóquio',
        image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop',
        category: 'Cultura'
    },
    {
        id: '4',
        title: 'Workshop de Mangá',
        description: 'Aprenda técnicas de desenho com mangakás profissionais.',
        date: '2026-02-20',
        time: '14:00 - 17:00',
        location: 'Akihabara Culture Center',
        image: 'https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=800&h=600&fit=crop',
        category: 'Arte'
    },
    {
        id: '5',
        title: 'Encontro da Comunidade Brasileira',
        description: 'Networking e confraternização para brasileiros no Japão.',
        date: '2026-02-28',
        time: '18:00 - 22:00',
        location: 'Brazilian Center, Shibuya',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop',
        category: 'Comunidade'
    }
];

export const mockBusinesses: BusinessItem[] = [
    {
        id: '1',
        name: 'Sakura Sushi Premium',
        category: 'Restaurante',
        description: 'Sushi autêntico preparado por chef com 30 anos de experiência.',
        rating: 4.9,
        reviews: 1250,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=600&fit=crop',
        location: 'Ginza, Tóquio',
        featured: true
    },
    {
        id: '2',
        name: 'Tokyo Tech Academy',
        category: 'Educação',
        description: 'Escola de programação e tecnologia com cursos em português.',
        rating: 4.8,
        reviews: 890,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
        location: 'Shibuya, Tóquio',
        featured: true
    },
    {
        id: '3',
        name: 'Zen Garden Spa',
        category: 'Bem-estar',
        description: 'Experiência relaxante com tratamentos tradicionais japoneses.',
        rating: 4.7,
        reviews: 567,
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop',
        location: 'Roppongi, Tóquio'
    },
    {
        id: '4',
        name: 'Nippon Motors',
        category: 'Automotivo',
        description: 'Concessionária especializada em carros japoneses importados.',
        rating: 4.6,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
        location: 'Yokohama'
    },
    {
        id: '5',
        name: 'Kaizen Consulting',
        category: 'Consultoria',
        description: 'Assessoria para empresas que desejam expandir no mercado japonês.',
        rating: 4.9,
        reviews: 178,
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop',
        location: 'Marunouchi, Tóquio'
    }
];

export const mockInfluencers: InfluencerItem[] = [
    {
        id: '1',
        name: 'Yuki Tanaka',
        handle: '@yukitanaka',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
        followers: '2.5M',
        category: 'Lifestyle',
        verified: true,
        featured: true
    },
    {
        id: '2',
        name: 'Ken Watanabe',
        handle: '@kenwatanabe_jp',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        followers: '1.8M',
        category: 'Tecnologia',
        verified: true,
        featured: true
    },
    {
        id: '3',
        name: 'Sakura Yamamoto',
        handle: '@sakurayama',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
        followers: '980K',
        category: 'Moda',
        verified: true
    },
    {
        id: '4',
        name: 'Hiroshi Nakamura',
        handle: '@hiroshi_food',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
        followers: '750K',
        category: 'Gastronomia',
        verified: true
    },
    {
        id: '5',
        name: 'Aiko Suzuki',
        handle: '@aiko_travel',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
        followers: '1.2M',
        category: 'Viagens',
        verified: true
    }
];

export const mockCommunities: CommunityItem[] = [
    {
        id: '1',
        title: 'Brasileiros no Japão',
        description: 'Comunidade para brasileiros vivendo ou querendo viver no Japão.',
        members: 45000,
        image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop',
        category: 'Expats',
        featured: true
    },
    {
        id: '2',
        title: 'Anime & Manga Brasil',
        description: 'Discussões sobre seus animes e mangás favoritos.',
        members: 78000,
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=600&fit=crop',
        category: 'Entretenimento',
        featured: true
    },
    {
        id: '3',
        title: 'Estudantes de Japonês',
        description: 'Grupo de estudo e prática do idioma japonês.',
        members: 32000,
        image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop',
        category: 'Educação'
    },
    {
        id: '4',
        title: 'Tech Jobs Japan',
        description: 'Oportunidades de trabalho em tecnologia no Japão.',
        members: 15000,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
        category: 'Carreira'
    },
    {
        id: '5',
        title: 'Culinária Japonesa',
        description: 'Receitas, dicas e segredos da gastronomia japonesa.',
        members: 28000,
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=600&fit=crop',
        category: 'Gastronomia'
    }
];
