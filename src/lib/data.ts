import { Award, Trophy, TrendingUp, BarChart } from 'lucide-react';
import { translations } from './translations';

export const getNavLinks = (language: 'en' | 'hi') => translations[language].navLinks;

export const getHeroStats = (language: 'en' | 'hi') => translations[language].heroStats;

export const getTimelineEvents = (language: 'en' | 'hi') => {
    return translations[language].timelineEvents;
};

export const getStats = (language: 'en' | 'hi') => {
    const t = translations[language].stats;
    return {
        careerSummary: [
            { format: t.careerSummary.formats.tests, matches: 113, runs: 8848, hs: '254*', avg: 49.15 },
            { format: t.careerSummary.formats.odis, matches: 292, runs: 13848, hs: '183', avg: 58.67 },
            { format: t.careerSummary.formats.t20is, matches: 117, runs: 4037, hs: '122*', avg: 51.75 },
            { format: t.careerSummary.formats.ipl, matches: 237, runs: 7263, hs: '113', avg: 37.25 },
        ],
        runsByYear: [
            { year: '2016', runs: 2595 },
            { year: '2017', runs: 2818 },
            { year: '2018', runs: 2735 },
            { year: '2019', runs: 2455 },
            { year: '2020', runs: 842 },
            { year: '2021', runs: 964 },
            { year: '2022', runs: 1348 },
            { year: '2023', runs: 2048 },
        ],
        achievements: t.achievements.list.map((item, index) => {
            const icons = [Award, Trophy, TrendingUp, BarChart, Award, Trophy];
            return { icon: icons[index], text: item };
        })
    };
};

export const getMediaItems = (language: 'en' | 'hi') => {
    const t = translations[language].media;
    return [
        { id: 'gallery-2', type: 'image', year: 2023, event: t.items.worldCup, category: t.filters.batting, categoryKey: 'Batting' as const },
        { id: 'gallery-6', type: 'image', year: 2022, event: t.items.asiaCup, category: t.filters.fielding, categoryKey: 'Fielding' as const },
        { id: 'gallery-5', type: 'image', year: 2018, event: t.items.awards, category: t.filters.award, categoryKey: 'Award' as const },
        { id: 'gallery-3', type: 'image', year: 2023, event: 'IPL', category: t.filters.training, categoryKey: 'Training' as const },
        { id: 'gallery-1', type: 'image', year: 2021, event: t.items.photoshoot, category: t.filters.portrait, categoryKey: 'Portrait' as const },
        { id: 'gallery-4', type: 'image', year: 2022, event: t.items.personal, category: t.filters.interview, categoryKey: 'Interview' as const },
    ];
};

export const getMediaFilters = (language: 'en' | 'hi') => {
    const t = translations[language].media.filters;
    return [
        { key: 'All' as const, label: t.all },
        { key: 'Batting' as const, label: t.batting },
        { key: 'Fielding' as const, label: t.fielding },
        { key: 'Training' as const, label: t.training },
        { key: 'Award' as const, label: t.award },
        { key: 'Interview' as const, label: t.interview },
        { key: 'Portrait' as const, label: t.portrait },
    ];
};


export const socialLinks = {
    twitter: 'https://twitter.com/imVkohli',
    instagram: 'https://www.instagram.com/virat.kohli/',
    facebook: 'https://www.facebook.com/virat.kohli',
};

export const getSocialFeed = (language: 'en' | 'hi') => translations[language].socialFeed;
