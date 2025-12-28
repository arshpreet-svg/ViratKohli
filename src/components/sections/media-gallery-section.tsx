
"use client";

import { useState, useContext } from 'react';
import Image from 'next/image';
import { getMediaItems, getMediaFilters } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';
import { LanguageContext } from '@/context/language-context';

type Filter = {
    key: 'All' | 'Batting' | 'Fielding' | 'Training' | 'Award' | 'Interview' | 'Portrait';
    label: string;
}

const MediaGallerySection = () => {
    const { language } = useContext(LanguageContext);
    const mediaItems = getMediaItems(language);
    const filters = getMediaFilters(language);

    const [activeFilter, setActiveFilter] = useState<Filter['key']>('All');
    const [selectedMedia, setSelectedMedia] = useState<(typeof mediaItems[0] & { placeholder: any }) | null>(null);

    const filteredMedia = mediaItems.filter(item => 
        activeFilter === 'All' || item.categoryKey === activeFilter
    );

    const openModal = (item: typeof mediaItems[0]) => {
        const placeholder = PlaceHolderImages.find(p => p.id === item.id);
        if (placeholder) {
            setSelectedMedia({ ...item, placeholder });
        }
    };

    return (
        <section id="gallery" className="w-full py-20 md:py-32 bg-muted/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">{language === 'en' ? 'Media Gallery' : 'मीडिया गैलरी'}</h2>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                        {language === 'en' ? 'Iconic moments captured on and off the field.' : 'मैदान पर और मैदान के बाहर कैद किए गए प्रतिष्ठित क्षण।'}
                    </p>
                </div>

                <div className="flex justify-center flex-wrap gap-2 mb-8">
                    {filters.map(filter => (
                        <Button
                            key={filter.key}
                            variant={activeFilter === filter.key ? 'default' : 'outline'}
                            onClick={() => setActiveFilter(filter.key)}
                            className="transition-all"
                        >
                            {filter.label}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredMedia.map(item => {
                        const placeholder = PlaceHolderImages.find(p => p.id === item.id);
                        if (!placeholder) return null;
                        
                        return (
                            <Card 
                                key={item.id} 
                                className="overflow-hidden group cursor-pointer"
                                onClick={() => openModal(item)}
                            >
                                <CardContent className="p-0 relative aspect-video bg-black">
                                    <Image
                                        src={placeholder.imageUrl}
                                        alt={placeholder.description}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        data-ai-hint={placeholder.imageHint}
                                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Eye className="w-12 h-12 text-white" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full p-4">
                                        <h3 className="text-white font-semibold">{item.event} - {item.year}</h3>
                                        <span className="text-xs text-white/80">{item.category}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>

            <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
                <DialogContent className="max-w-4xl p-0 border-0 bg-black">
                    {selectedMedia && (
                        <>
                          <DialogTitle className="sr-only">{selectedMedia.event} - {selectedMedia.year}</DialogTitle>
                          <div className="relative aspect-video">
                              <Image
                                  src={selectedMedia.placeholder.imageUrl}
                                  alt={selectedMedia.placeholder.description}
                                  fill
                                  data-ai-hint={selectedMedia.placeholder.imageHint}
                                  className="object-contain rounded-md"
                              />
                          </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default MediaGallerySection;
