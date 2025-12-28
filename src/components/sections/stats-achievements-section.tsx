"use client";

import { useState, useMemo, useContext } from 'react';
import { getStats } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';


const StatsAchievementsSection = () => {
    const { language } = useContext(LanguageContext);
    const stats = getStats(language);
    const t = translations[language].stats;

    type SortKey = keyof typeof stats.careerSummary[0];
    type SortDirection = 'asc' | 'desc';

    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>({ key: 'runs', direction: 'desc' });

    const sortedSummary = useMemo(() => {
        let sortableItems = [...stats.careerSummary];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    if (aValue.startsWith('*') || bValue.startsWith('*')) {
                        // Handle 'HS' column with '*'
                        const numA = parseInt(aValue.replace('*', ''), 10);
                        const numB = parseInt(bValue.replace('*', ''), 10);
                        if (numA < numB) return sortConfig.direction === 'asc' ? -1 : 1;
                        if (numA > numB) return sortConfig.direction === 'asc' ? 1 : -1;
                        return 0;
                    }
                     if (sortConfig.key === 'format') {
                        return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                    }
                }

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [sortConfig, stats.careerSummary]);

    const requestSort = (key: SortKey) => {
        let direction: SortDirection = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: SortKey) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <ArrowUpDown className="ml-2 h-4 w-4 opacity-30" />;
        }
        return sortConfig.direction === 'asc' ? 
            <ArrowUpDown className="ml-2 h-4 w-4 transform rotate-180" /> : 
            <ArrowUpDown className="ml-2 h-4 w-4" />;
    };
    
    return (
        <section id="stats" className="w-full py-20 md:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">{t.title}</h2>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                        {t.description}
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>{t.careerSummary.title}</CardTitle>
                            <CardDescription>{t.careerSummary.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead onClick={() => requestSort('format')}>
                                            <div className="flex items-center cursor-pointer">{t.careerSummary.format} {getSortIcon('format')}</div>
                                        </TableHead>
                                        <TableHead onClick={() => requestSort('matches')}>
                                            <div className="flex items-center cursor-pointer">{t.careerSummary.matches} {getSortIcon('matches')}</div>
                                        </TableHead>
                                        <TableHead onClick={() => requestSort('runs')}>
                                            <div className="flex items-center cursor-pointer">{t.careerSummary.runs} {getSortIcon('runs')}</div>
                                        </TableHead>
                                        <TableHead onClick={() => requestSort('hs')}>
                                            <div className="flex items-center cursor-pointer">{t.careerSummary.hs} {getSortIcon('hs')}</div>
                                        </TableHead>
                                        <TableHead onClick={() => requestSort('avg')}>
                                            <div className="flex items-center cursor-pointer">{t.careerSummary.avg} {getSortIcon('avg')}</div>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sortedSummary.map((item) => (
                                        <TableRow key={item.format} className="hover:bg-muted/50">
                                            <TableCell className="font-medium">{item.format}</TableCell>
                                            <TableCell>{item.matches}</TableCell>
                                            <TableCell>{item.runs}</TableCell>
                                            <TableCell>{item.hs}</TableCell>
                                            <TableCell>{item.avg}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t.runsByYear.title}</CardTitle>
                            <CardDescription>{t.runsByYear.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={stats.runsByYear}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="year" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                    <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                    <Tooltip contentStyle={{
                                        background: 'hsl(var(--background))',
                                        borderColor: 'hsl(var(--border))'
                                    }}/>
                                    <Legend />
                                    <Bar dataKey="runs" fill="hsl(var(--primary))" name={t.runsByYear.barLabel} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t.achievements.title}</CardTitle>
                             <CardDescription>{t.achievements.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {stats.achievements.map((ach, index) => (
                                    <li key={index} className="flex items-center gap-4 group">
                                        <div className="p-2 bg-muted rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <ach.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                                        </div>
                                        <span className="text-muted-foreground group-hover:text-foreground">{ach.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default StatsAchievementsSection;
