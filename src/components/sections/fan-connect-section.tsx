"use client";

import { useState, useContext, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from 'next/link';
import { Twitter, Instagram, Facebook, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { socialLinks } from '@/lib/data';
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { useFirebase, addDocumentNonBlocking } from "@/firebase";
import { collection } from "firebase/firestore";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { useToast } from "@/hooks/use-toast";
import SocialFeed from "@/components/social-feed";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(500, {
    message: "Message cannot exceed 500 characters."
  }),
});

const FanConnectSection = () => {
    const { language } = useContext(LanguageContext);
    const t = translations[language].fanConnect;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { firestore, auth, user, isUserLoading } = useFirebase();
    const { toast } = useToast();

    useEffect(() => {
      if (!isUserLoading && !user && auth) {
        initiateAnonymousSignIn(auth);
      }
    }, [isUserLoading, user, auth]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!firestore || !user) {
             toast({
                variant: "destructive",
                title: "Error",
                description: "Cannot connect to the database. Please try again later.",
            });
            return;
        }
        setIsSubmitting(true);

        const fanMessagesCol = collection(firestore, 'fan_messages');
        const messageData = {
          ...values,
          submissionDate: new Date().toISOString(),
          userId: user.uid,
        };

        try {
            await addDocumentNonBlocking(fanMessagesCol, messageData);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error submitting message:", error);
            toast({
                variant: "destructive",
                title: "Submission Failed",
                description: "There was an error sending your message. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }
  
    return (
        <section id="connect" className="w-full py-20 md:py-32 bg-muted/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">{t.title}</h2>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                        {t.description}
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <div className="flex flex-col items-center lg:items-start lg:col-span-1 space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">{t.follow}</h3>
                            <div className="flex space-x-6">
                                <Link href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110">
                                    <Twitter className="h-10 w-10" />
                                    <span className="sr-only">Twitter</span>
                                </Link>
                                <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110">
                                    <Instagram className="h-10 w-10" />
                                    <span className="sr-only">Instagram</span>
                                </Link>
                                <Link href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110">
                                    <Facebook className="h-10 w-10" />
                                    <span className="sr-only">Facebook</span>
                                </Link>
                            </div>
                        </div>
                        <SocialFeed />
                    </div>

                    <Card className="w-full lg:col-span-2">
                        <CardHeader>
                            <CardTitle>{isSubmitted ? t.submittedTitle : t.formTitle}</CardTitle>
                        </CardHeader>
                        <CardContent>
                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 min-h-[390px]">
                                <CheckCircle2 className="h-16 w-16 text-primary" />
                                <p className="text-lg text-muted-foreground">{t.submittedMessage}</p>
                                <Button 
                                    onClick={() => {
                                        setIsSubmitted(false);
                                        form.reset();
                                    }}
                                    variant="outline"
                                    className="mt-6"
                                >
                                    {t.sendAnother}
                                </Button>
                            </div>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t.formName}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={t.formNamePlaceholder} {...field} disabled={isSubmitting} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t.formEmail}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={t.formEmailPlaceholder} {...field} disabled={isSubmitting}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t.formMessage}</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder={t.formMessagePlaceholder} className="resize-none" rows={5} {...field} disabled={isSubmitting}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting || isUserLoading}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-4 w-4" />
                                                {t.formSubmit}
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default FanConnectSection;
