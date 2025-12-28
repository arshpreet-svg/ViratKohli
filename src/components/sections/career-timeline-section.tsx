
"use client";
import { useContext } from 'react';
import Image from 'next/image';
import { getTimelineEvents } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LanguageContext } from '@/context/language-context';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const CareerTimelineSection = () => {
  const { language } = useContext(LanguageContext);
  const timelineEvents = getTimelineEvents(language);

  return (
    <section id="career" className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">{language === 'en' ? 'Career Journey' : 'करियर यात्रा'}</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {language === 'en' ? 'A timeline of key moments and achievements from an illustrious career.' : 'एक शानदार करियर के प्रमुख क्षणों और उपलब्धियों की एक समयरेखा।'}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
            {timelineEvents.map((event, index) => {
                const placeholder = PlaceHolderImages.find(p => p.id === event.imageId);
                return (
                <AccordionItem value={`item-${index}`} key={index}>
                    <Card className="group overflow-hidden transform transition-transform duration-300 hover:shadow-xl w-full mb-4">
                    <AccordionTrigger>
                        <CardHeader className="w-full text-left">
                        <CardTitle className="font-bold text-xl">{event.title}</CardTitle>
                        <CardDescription className="text-primary font-semibold">{event.year}</CardDescription>
                        </CardHeader>
                    </AccordionTrigger>
                    <AccordionContent>
                        <CardContent>
                        {placeholder && (
                            <div className="aspect-video overflow-hidden rounded-md mb-4 bg-black">
                            <Image
                                src={placeholder.imageUrl}
                                alt={placeholder.description}
                                width={800}
                                height={600}
                                data-ai-hint={placeholder.imageHint}
                                className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                            />
                            </div>
                        )}
                        <p className="text-muted-foreground">{event.description}</p>
                        </CardContent>
                    </AccordionContent>
                    </Card>
                </AccordionItem>
                );
            })}
            </Accordion>
        </div>
      </div>
    </section>
  );
};

export default CareerTimelineSection;
