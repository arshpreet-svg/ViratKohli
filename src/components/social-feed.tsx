
"use client";
import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getSocialFeed } from '@/lib/data';
import { LanguageContext } from '@/context/language-context';
import { Heart, MessageCircle, Repeat } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const SocialFeed = () => {
    const { language } = useContext(LanguageContext);
    const feed = getSocialFeed(language);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    };

    const PostSkeleton = () => (
        <div className="p-4 border rounded-lg bg-background/50">
            <div className="flex items-start space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    );

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Live Social Feed</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {loading ? (
                        <>
                            <PostSkeleton />
                            <PostSkeleton />
                        </>
                    ) : (
                        feed.map((post) => (
                            <div key={post.id} className="p-4 border rounded-lg bg-background/50 animate-in fade-in-50">
                                <div className="flex items-start space-x-3">
                                    <Avatar>
                                        <AvatarImage src={post.avatar} alt={post.author} />
                                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-1">
                                            <p className="font-semibold">{post.author}</p>
                                            <p className="text-sm text-muted-foreground">@{post.handle}</p>
                                            <span className="text-sm text-muted-foreground">·</span>
                                            <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                                        </div>
                                        <p className="mt-1 text-sm">{post.content}</p>
                                        <div className="flex justify-between items-center mt-3 text-muted-foreground">
                                            <div className="flex items-center space-x-1 hover:text-primary cursor-pointer">
                                                <MessageCircle size={16} />
                                                <span className="text-xs"></span>
                                            </div>
                                            <div className="flex items-center space-x-1 hover:text-green-500 cursor-pointer">
                                                <Repeat size={16} />
                                                <span className="text-xs">{formatNumber(post.retweets)}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 hover:text-red-500 cursor-pointer">
                                                <Heart size={16} />
                                                <span className="text-xs">{formatNumber(post.likes)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default SocialFeed;
